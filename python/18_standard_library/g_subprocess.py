"""
subprocess - run other programs
 subprocess.run([...], capture_output=True, text=True, check=True)
Pass the command as a LIST; avoid shell=True with user input (shell injection).
"""
import subprocess
import sys

result = subprocess.run([sys.executable, "--version"], capture_output=True, text=True)
print(result.returncode, result.stdout.strip())  # 0 Python 3.x.y

result = subprocess.run([sys.executable, "-c", "print(6 * 7)"], capture_output=True, text=True, check=True)
print(result.stdout.strip())  # 42

try:
    subprocess.run([sys.executable, "-c", "import sys; sys.exit(3)"], check=True)
except subprocess.CalledProcessError as e:
    print("command failed with exit code", e.returncode)  # 3

try:
    subprocess.run([sys.executable, "-c", "import time; time.sleep(5)"], timeout=0.5)
except subprocess.TimeoutExpired:
    print("command timed out")
