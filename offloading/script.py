from subprocess import Popen

def main():
    # run commands in parallel
    processes = [
        Popen("./server.bash", shell=True),
        Popen("./client.bash", shell=True),
    ]

    # collect statuses
    exitcodes = [p.wait() for p in processes]

    print(processes)
    print(exitcodes)

if __name__ == "__main__":
    main()
