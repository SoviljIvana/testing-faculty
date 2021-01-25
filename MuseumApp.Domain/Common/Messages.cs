

namespace MuseumApp.Domain.Common
{
    public class Messages
    {
        //museum
        public const string MUSEUM_GET_ALL_ERROR = "Error occured while getting all museums, please try again.";
        public const string MUSEUM_GET_ID_ERROR = "Error occured while getting museum with id: ";
        public const string MUSEUM_DELETE_ERROR = "Cannot delete museum: ";
        public const string MUSEUM_NOT_FOUND_ERROR = "Museum not found: ";
        public const string MUSEUM_WITH_THIS_ID_ALREADY_EXISTS = "Museum with this id already exists";
        public const string MUSEUM_UPDATE_ERROR = "Museum update error";

        //auditorium
        public const string AUDITORIUM_GET_ID_ERROR = "Error occured while getting auditorium with id: ";
        public const string AUDITORIUM_GET_ALL_ERROR = "Error occured while getting all auditoriums, please try again.";
        public const string AUDITORIUM_DELETE_ERROR = "Cannot delete autitorium: ";
        public const string AUDITORIUM_NOT_FOUND_ERROR = "Auditorium not found: ";
        public const string MUSEUM_DOES_NOT_EXIST = "Museum with this id does not exist";
        public const string AUDITORIUM_WITH_THIS_ID_ALREADY_EXISTS = "Auditorium with this id already exists";
        public const string AUDITORIUM_UPDATE_ERROR = "Auditorium update error";

        //exhibition
        public const string EXHIBITIONS_GET_ALL_ERROR = "Error occured while getting all exhibitions, please try again.";
        public const string EXHIBITION_GET_ID_ERROR = "Error occured while getting exhibition with id: ";
        public const string EXHIBITIONS_LIST_IS_EMPTY = "List of exhibitions are empty and you can't delete.";
        public const string EXHIBITION_DOES_NOT_EXIST = "Does not exist exhibition with this id. ";
        public const string EXHIBITION_IN_THE_FUTURE = "Exhibition must be in the future! Try again later...";
        public const string EXHIBITION_IS_NOT_OVER = "The exhibition is not over yet";
        public const string A_TICKET_TO_THIS_EXHIBITION_WAS_PURCHASED = "A ticket to this exhibition was purchased";
        public const string EXHIBITION_WITH_THIS_ID_ALREADY_EXISTS = "Exhibition with this id already exists, please try something else..";

        //exhibit
        public const string EXHIBITS_GET_ALL_ERROR = "Error occured while getting all exhibits, please try again.";
        public const string EXHIBIT_GET_ID_ERROR = "Error occured while getting exhibit with id: ";
        public const string EXHIBITS_EMPTY_LIST = "List of exhibits are empty and you can't delete.";
        public const string EXHIBIT_DOES_NOT_EXIST = "Does not exist exhibit with this id. ";
        public const string EXHIBIT_UPDATE_ERROR = "Exhibit update error";
        public const string AUDITORIUM_WITH_THIS_ID_DOES_NOT_EXIST = "Auditorium with this id does not exist";
        public const string EXHIBITION_WITH_THIS_ID_DOES_NOT_EXIST = "Exhibition with this id does not exist";
        public const string START_MUST_BE_IN_THE_FUTURE = "Start time of exhibition must be in the future and end time must be after start time";
        public const string EXHIBIT_WITH_THIS_ID_ALREADY_EXISTS = "Exhibit with this id already exists, please try something else..";
        public const string EXHIBITION_UPDATE_ERROR = "Exhibition update error";
        public const string AUDITORIUM_DOES_NOT_EXIST = "Does not exist auditorium with this id. ";

        //tag
        public const string TAG_GET_ID_ERROR = "Error occured while getting tag with id: ";
        public const string TAGS_GET_ALL_ERROR = "Error occured while getting all tags, please try again.";
        public const string TAGS_EMPTY_LIST = "List of tags are empty and you can't delete.";
        public const string TAG_DOES_NOT_EXIST = "Does not exist tag with this id. ";



    }
}