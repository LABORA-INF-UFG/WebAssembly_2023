import os

def shell(command):
    os.system(command)

def cd(path):
    os.chdir(path)

def runServer():
    cd("serve")
    shell("npm run serve")
    cd("..")

def runClient():
    cd("serve")
    shell("npm run serve")
    
    cd("..")

def main():
    cd("alvaar-socket")
    runServer()
    runClient()

if __name__ == "__main__":
    main()
