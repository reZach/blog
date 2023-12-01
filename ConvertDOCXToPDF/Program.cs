using System.Diagnostics;

namespace ConvertDOCXToPDF
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Create LibreOfficeWriter CLI process
            var commandArgs = new List<string>
            {
                "--convert-to", //a flag that will be followed by the file type we want to convert to
                "pdf:writer_pdf_Export", // the [output file type]:[OutputFilterName] we are requesting the output to be; more details are here (https://help.libreoffice.org/latest/en-US/text/shared/guide/convertfilters.html)
                "C:\\Users\\zachary\\Downloads\\Letter.docx", // input file
                "--norestore", // disables restart and file recovery after a system crash
                "--headless", // allows using the application without user interface
                "--outdir", // a flag that will be followed by the output directory where we want our new pdf file to be created
                "C:\\Users\\zachary\\Downloads" // output directory
            };

            // The path to LibreOfficeWriterPortable.exe
            ProcessStartInfo processStartInfo = new ProcessStartInfo("C:\\Users\\zachary\\Downloads\\LibreOfficePortablePrevious\\LibreOfficeWriterPortable.exe"); 
            foreach (string arg in commandArgs)
                processStartInfo.ArgumentList.Add(arg);

            Process process = new Process
            {
                StartInfo = processStartInfo
            };

            // Only 1 instance of LibreOfficeWriter can be running at a given time
            Process[] existingProcesses = Process.GetProcessesByName("soffice");
            while (existingProcesses.Length > 0)
            {
                Thread.Sleep(1000);
                existingProcesses = Process.GetProcessesByName("soffice");
            }

            // Start the process
            process.Start();
            process.WaitForExit();

            // Check for failed exit code.
            if (process.ExitCode != 0)
                throw new Exception("Failed to convert file");
            else
            {
                int totalChecks = 10;
                int currentCheck = 1;

                string originalFileName = Path.GetFileNameWithoutExtension(commandArgs[2]);
                string newFilePath = Path.Combine(commandArgs[6], $"{originalFileName}.pdf");

                while (currentCheck <= totalChecks)
                {
                    if (File.Exists(newFilePath))
                    {
                        // File conversion was successful
                        Console.WriteLine($"File conversion was successful. {originalFileName}.pdf was created.");

                        break;
                    }

                    Thread.Sleep(500); // LibreOffice doesn't immediately create PDF output once the command is run
                }
            }
        }
    }
}