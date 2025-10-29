using Microsoft.AspNetCore.Mvc;

namespace TrumpVerse.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ImageUploadController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        //Genererer tilfeldig navn til filer, slik at filer med mellomrom ikke blir ødelagt og for lettere testing.
        string webRootPath = _webHostEnvironment.WebRootPath;
        string fileExtension = Path.GetExtension(file.FileName);
        string uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
        string relativePath = Path.Combine("images", uniqueFileName);
        string absolutePath = Path.Combine(webRootPath, relativePath);

        using(var fileStream = new FileStream(absolutePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return Created(uniqueFileName, new {url = uniqueFileName});
    }
}