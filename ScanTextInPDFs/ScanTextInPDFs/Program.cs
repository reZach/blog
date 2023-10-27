using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using iText.Kernel.Pdf.Canvas.Parser.Listener;

namespace ScanTextInPDFs
{
    internal class Program
    {
        public static async Task Main(string[] args)
        {
            string executingDirectory = AppContext.BaseDirectory;

            byte[] bytes = await File.ReadAllBytesAsync($"{executingDirectory}PDFs\\Brochure.pdf");
            string textToFind = "Lorem ipsum";
            bool foundText = false;

            using (MemoryStream memoryStream = new MemoryStream(bytes))
            {
                using PdfReader pdfReader = new PdfReader(memoryStream);
                using PdfDocument pdfDocument = new PdfDocument(pdfReader);

                for (int page = 1; page <= pdfDocument.GetNumberOfPages(); page++)
                {
                    PdfPage pdfPage = pdfDocument.GetPage(page);
                    string pageText = PdfTextExtractor.GetTextFromPage(pdfPage, new SimpleTextExtractionStrategy());

                    if (pageText.Contains(textToFind, StringComparison.Ordinal))
                        foundText = true;
                }
            }

            if (foundText)
                Console.WriteLine($"Found '{textToFind}' in the pdf.");
            else
                Console.WriteLine($"Did not find '{textToFind}' in the pdf.");
        }
    }
}