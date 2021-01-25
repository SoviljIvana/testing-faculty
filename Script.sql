USE [Museum]
GO
/****** Object:  Table [dbo].[Auditorium]    Script Date: 28.5.2020. 10.17.26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auditorium](
	[AuditoriumId] [int] NOT NULL,
	[MuseumId] [int] NULL,
	[NameOfAuditorium] [nvarchar](50) NULL,
	[NumberOfSeats] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[AuditoriumId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exhibit]    Script Date: 28.5.2020. 10.17.27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exhibit](
	[ExhibitId] [int] NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Year] [int] NULL,
	[PicturePath] [nvarchar](255) NULL,
	[AuditoriumId] [int] NULL,
	[ExhibitionId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ExhibitId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exhibition]    Script Date: 28.5.2020. 10.17.27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exhibition](
	[ExhibitionId] [int] NOT NULL,
	[ExhibitionName] [nvarchar](50) NULL,
	[AuditoriumId] [int] NULL,
	[TypeOfExhibition] [nvarchar](50) NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[About] [nvarchar](100) NULL,
	[Picture] [nvarchar](255) NULL,
	[Description] [nchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[ExhibitionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Museum]    Script Date: 28.5.2020. 10.17.27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Museum](
	[MuseumId] [int] NOT NULL,
	[Name] [nvarchar](50) NULL,
	[StreetAndNumber] [nvarchar](50) NULL,
	[City] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[PhoneNumber] [nvarchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[MuseumId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ticket]    Script Date: 28.5.2020. 10.17.27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ticket](
	[TicketId] [int] NOT NULL,
	[Payment] [int] NULL,
	[ExhibitionId] [int] NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TicketId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 28.5.2020. 10.17.27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] NOT NULL,
	[FirstName] [nvarchar](30) NULL,
	[LastName] [nvarchar](30) NULL,
	[Username] [nvarchar](30) NULL,
	[Password] [nvarchar](30) NULL,
	[YearOfBirth] [date] NULL,
	[Email] [nvarchar](50) NULL,
	[isAdmin] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Auditorium]  WITH CHECK ADD FOREIGN KEY([MuseumId])
REFERENCES [dbo].[Museum] ([MuseumId])
GO
ALTER TABLE [dbo].[Exhibit]  WITH CHECK ADD FOREIGN KEY([ExhibitionId])
REFERENCES [dbo].[Exhibition] ([ExhibitionId])
GO
ALTER TABLE [dbo].[Exhibition]  WITH CHECK ADD FOREIGN KEY([AuditoriumId])
REFERENCES [dbo].[Auditorium] ([AuditoriumId])
GO
ALTER TABLE [dbo].[Ticket]  WITH CHECK ADD FOREIGN KEY([ExhibitionId])
REFERENCES [dbo].[Exhibition] ([ExhibitionId])
GO
ALTER TABLE [dbo].[Ticket]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO