"""
shutil - copy, move and delete whole files and folders
tempfile - temporary files and folders that clean themselves up
"""
import shutil
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as tmp:  # deleted automatically at the end
    root = Path(tmp)
    (root / "project" / "src").mkdir(parents=True)
    (root / "project" / "src" / "app.py").write_text("print('hi')")

    shutil.copytree(root / "project", root / "backup")  # copy a whole folder
    shutil.copy(root / "project" / "src" / "app.py", root / "app_copy.py")
    shutil.move(root / "app_copy.py", root / "moved.py")
    archive = shutil.make_archive(str(root / "project"), "zip", root / "project")

    print(sorted(p.name for p in root.iterdir()))  # ['backup', 'moved.py', 'project', 'project.zip']
    shutil.rmtree(root / "backup")  # delete a folder and everything in it
    print((root / "backup").exists())  # False
    print(shutil.disk_usage(root).total > 0)  # True

with tempfile.NamedTemporaryFile("w+", suffix=".txt", delete=True) as f:
    f.write("scratch data")
    f.seek(0)
    print(f.read())  # scratch data
