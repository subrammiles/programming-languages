// Files and folders (System.IO)
//  File.WriteAllText / ReadAllText / ReadAllLines / AppendAllText  (and Async versions)
//  File.ReadLines         streams lines lazily (good for big files)
//  StreamReader / StreamWriter   for more control
//  Path.Combine, Directory, FileInfo
// Run: dotnet run 13_files_and_json/a_files.cs

string dir = Path.Combine(Path.GetTempPath(), $"csharp-files-{Guid.NewGuid():N}");
Directory.CreateDirectory(dir);
string path = Path.Combine(dir, "notes.txt");

await File.WriteAllTextAsync(path, "line 1\nline 2\n");
await File.AppendAllLinesAsync(path, ["line 3"]);
Console.Write(await File.ReadAllTextAsync(path));

foreach (var (line, i) in File.ReadLines(path).Select((l, i) => (l, i + 1)))
    Console.WriteLine($"{i}: {line}");

using (var writer = new StreamWriter(Path.Combine(dir, "log.csv")))
{
    await writer.WriteLineAsync("name,score");
    await writer.WriteLineAsync("Asha,90");
}

var info = new FileInfo(path);
Console.WriteLine($"{info.Name} {info.Length} bytes, extension {info.Extension}");
Console.WriteLine(string.Join(", ", Directory.GetFiles(dir).Select(Path.GetFileName).Order()));
Console.WriteLine(File.Exists(Path.Combine(dir, "missing.txt"))); // False

try
{
    File.ReadAllText(Path.Combine(dir, "missing.txt"));
}
catch (FileNotFoundException e)
{
    Console.WriteLine($"FileNotFoundException: {Path.GetFileName(e.FileName)}");
}

Directory.Delete(dir, recursive: true);
Console.WriteLine($"cleaned up: {!Directory.Exists(dir)}");
