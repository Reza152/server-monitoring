import subprocess

hasil = subprocess.run(
    ["docker", "ps", "-a"],
    capture_output=True,
    text=True
)

print("RETURN:", hasil.returncode)
print("STDOUT:")
print(hasil.stdout)
print("STDERR:")
print(hasil.stderr)
