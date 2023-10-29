using iText.Html2pdf;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;

namespace CreateInMemoryPDFs
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string executingDirectory = AppContext.BaseDirectory;

            // Set the page size of our PDF
            PageSize pageSize = new PageSize(612, 792);

            // masterStream holds the running-pdf document as
            // more and more HTML is added to it
            using (MemoryStream masterStream = new MemoryStream())
            {
                string html1 = @"
<div>
    <p>Paragraph 1</p>
</div>
";

                string html2 = @"
<div>
    <p>Paragraph 2</p>
</div>
";

                // Add HTML to our PDF
                AppendHTML(masterStream, html1, pageSize);
                AppendHTML(masterStream, html2, pageSize);

                // Create a new directory for our output PDF
                string newDirectory = $"{executingDirectory}{DateTime.Now.ToString("MM-dd-yyyy")}";
                if (!Directory.Exists(newDirectory))
                    Directory.CreateDirectory(newDirectory);

                // Save our in-memory PDF as a PDF on our file system
                using (FileStream fileStream = new FileStream($"{newDirectory}\\{DateTime.Now.ToString("HH-mm-ss")} output.pdf", FileMode.Create))
                    masterStream.WriteTo(fileStream);

                Console.Write("PDF was created");
            }
        }

        /// <summary>
        /// Converts <paramref name="html"/> into a PDF and appends it onto the existing in-memory PDF which is being stored in <paramref name="masterStream"/>.
        /// </summary>
        /// <param name="masterStream"></param>
        /// <param name="html"></param>
        /// <param name="pageSize"></param>
        static void AppendHTML(MemoryStream masterStream, string html, PageSize pageSize)
        {
            // Create the in-memory PDF of html
            using (MemoryStream componentStream = new MemoryStream())
            {
                // This memory stream is used by the pdfWriter below
                using (MemoryStream tempStream = new MemoryStream())
                {
                    using (PdfWriter pdfWriter = new PdfWriter(tempStream))
                    {
                        // Since creating a reader/writer in iText causes the underlying
                        // stream to close, we need to prevent that with this call
                        pdfWriter.SetCloseStream(false);

                        using (PdfDocument document = new PdfDocument(pdfWriter))
                        {
                            document.SetDefaultPageSize(pageSize);

                            HtmlConverter.ConvertToPdf(html, document, new ConverterProperties());

                            tempStream.WriteTo(componentStream);
                        }
                    }
                }

                // Append new component to PDF
                if (masterStream.Length == 0)
                    componentStream.WriteTo(masterStream);
                else
                {
                    // Append to existing PDF in-memory
                    using (MemoryStream tempStream = new MemoryStream())
                    {
                        // Since previous updates may move the position of the stream,
                        // set the position to 0 so the PDF can be read in full
                        masterStream.Position = 0;
                        componentStream.Position = 0;
                        using (PdfDocument combinedDocument = new PdfDocument(new PdfReader(masterStream), new PdfWriter(tempStream)))
                        {
                            // Read the new HTML content into a PDF document
                            using (PdfDocument componentDocument = new PdfDocument(new PdfReader(componentStream)))
                            {
                                combinedDocument.SetCloseWriter(false);

                                // Copies the new PDF onto the existing PDF (masterStream)
                                componentDocument.CopyPagesTo(1, componentDocument.GetNumberOfPages(), combinedDocument);
                            }

                            combinedDocument.Close();
                        }

                        // Reads all bytes from tempStream which at this point holds all
                        // existing PDF data, and any new PDF data we just appended to it.
                        // All of this data is then saved back into masterStream
                        byte[] temporaryBytes = tempStream.ToArray();
                        masterStream.Position = 0;
                        masterStream.SetLength(temporaryBytes.Length);
                        masterStream.Capacity = temporaryBytes.Length;
                        masterStream.Write(temporaryBytes, 0, temporaryBytes.Length);
                    }
                }
            }
        }
    }
}