#include <iostream>
#include <fstream>
#include <assert.h>
#include <string>

using namespace std;

int main(int argc, char *argv[])
{
    if (argc != 2)
        return 1;

    string file_name = argv[1];
    long long int input;
    long long int sum = 0;
    long long int count = 0;
    double avg;
    ifstream file; // declare stream variable name

    file.open(file_name, ios::in); // open file
    assert(!file.fail());

    file >> input;      // get first number from the file (priming the input statement)
                        // You must attempt to read info prior to an eof( ) test.

    while (!file.eof()) // if not at end of file, continue reading numbers
    {
        // cout << input << endl; // print numbers to screen
        sum += input;
        count++;
        file >> input;          // get next number from file
    }

    avg = sum / count;
    cout << avg << endl;

    file.close(); // close file
    return 0;
}