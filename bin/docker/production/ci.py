import subprocess
import sys
import select
import datetime

registry_url = "registry.algoric.net"
image_name = "ronin2-index-panel"
container_name = "ronin2-index-panel"

current_time = datetime.datetime.now()
time_tag = current_time.strftime("%Y-%m-%d")


def cmd(command):
    try:
        p = subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1  # line-buffered
        )
        # Satır satır aktar
        for line in iter(p.stdout.readline, ''):
            if line:
                print(f"\033[34m{line.rstrip()}\033[0m")
        p.stdout.close()
        rc = p.wait()
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
	image_latest_build_and_push_cmd = "docker buildx build --platform linux/amd64 -t " + registry_url + "/" + image_name + ":latest -f bin/docker/production/Dockerfile --push ."

	print("\033[32mLatest tag image creating...\033[0m")
	result = cmd(image_latest_build_and_push_cmd)

	if result is None:
		print("\033[31mLatest tag image could not be created.\033[0m")
		sys.exit(1)

	if result is None:
		print("\033[31mNow tag image could not be created.\033[0m")
		sys.exit(1)


if __name__ == "__main__":
	main()
