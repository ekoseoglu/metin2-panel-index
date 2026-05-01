import os
import subprocess
import sys
import select

image_name = "metin2-panel-index"
port = "4450"

def cmd(command):
	try:
		process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
		while True:
			reads = [process.stdout.fileno(), process.stderr.fileno()]
			ret = select.select(reads, [], [])

			for fd in ret[0]:
				if fd == process.stdout.fileno():
					output = process.stdout.readline()
					if output:
						print(f"\033[34m{output.strip()}\033[0m")
				if fd == process.stderr.fileno():
					error = process.stderr.readline()
					if error:
						print(f"\033[34m{error.strip()}\033[0m", file=sys.stderr)

			if process.poll() is not None:
				break

		rc = process.poll()
		if rc != 0:
			raise subprocess.CalledProcessError(rc, command)
		return rc
	except subprocess.CalledProcessError as e:
		print(f"\033[31mError: {e}\033[0m")
		return None
	except Exception as e:
		print(f"\033[31mError: {e}\033[0m")
		return None


def main():

	build_command = "docker build -t " + image_name + " -f bin/docker/production/Dockerfile ."
	run_command = "docker run -d -p " + port + ":3000 --name " + image_name + " " + image_name

	print("\033[32mDocker image creating...\033[0m")
	result = cmd(build_command)

	if result is None:
		print("\033[31mDocker image could not be created.\033[0m")
		sys.exit(1)

	print("\033[32mDocker container starting...\033[0m")
	cmd(run_command)


if __name__ == "__main__":
	main()
