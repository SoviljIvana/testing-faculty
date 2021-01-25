using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MuseumApp.Data.Context;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Services;
using MuseumApp.Repositories;
using MuseumApp.ServiceExtensions;

namespace MuseumApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MuseumContext>(options =>
            {
                options
                .UseSqlServer(Configuration.GetConnectionString("MuseumConnection"))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });
            services.AddJwtBearerAuthentication(Configuration);
            services.AddControllers();
            services.AddOpenApi();


            // Repositories
            services.AddTransient<IAuditoriumsRepository, AuditoriumsRepository>();
            services.AddTransient<IExhibitionsRepository, ExhibitionsRepository>();
            services.AddTransient<IExhibitsRepository, ExhibitsRepository>();
            services.AddTransient<IMuseumsRepository, MuseumsRepository>();
   

            // Business Logic
            services.AddTransient<IAuditoriumService, AuditoriumService>();
            services.AddTransient<IExhibitionService, ExhibitionService>();
            services.AddTransient<IExhibitService, ExhibitService>();
            services.AddTransient<IMuseumService, MuseumService>();
   

            // Allow Cors for client app
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    corsBuilder => corsBuilder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseOpenApi();

            app.UseSwaggerUi3();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}