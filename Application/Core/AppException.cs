namespace Application.Core
{
  public class AppException
  {
    public AppException(int statusCode, string mesage, string details = null)
    {
      StatusCode = statusCode;
      Mesage = mesage;
      Details = details;
    }

    public int StatusCode { get; set; }
    public string Mesage { get; set; }
    public string Details { get; set; }
  }
}
