// CMake generated file. Do Not Edit.

#pragma once

namespace pangolin {

  // Forward declarations
  bool RegisterEmscriptenWindowFactory();


  inline bool RegisterFactoriesWindowInterface() {
    bool success = true;
    success &= RegisterEmscriptenWindowFactory();
    return success;
  }


} // pangolin
