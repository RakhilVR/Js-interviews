#include <iostream>
#include <iomanip>
#include <sstream>

std::string toHex(unsigned int value) {
    std::stringstream stream;
    stream << std::hex << std::setfill('0') << std::setw(8) << value;
    return stream.str();
}

std::string simpleHash(const std::string& input) {
    unsigned int hash = 0;
    
    for (char c : input) {
        hash += static_cast<unsigned int>(c);
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }
    
    hash += (hash << 3);
    hash ^= (hash >> 11);
    hash += (hash << 15);
    
    return toHex(hash);
}

int main() {
    std::string input;
    std::cout << "Enter a string: ";
    std::getline(std::cin, input);
    
    std::string hash = simpleHash(input);
    std::cout << "Hash value: " << hash << std::endl;
    
    return 0;
}