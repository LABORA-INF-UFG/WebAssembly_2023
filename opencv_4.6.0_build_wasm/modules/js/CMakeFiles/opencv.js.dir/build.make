# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/gnery/Desktop/OpenCV_4.6.0_build/opencv

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm

# Utility rule file for opencv.js.

# Include any custom commands dependencies for this target.
include modules/js/CMakeFiles/opencv.js.dir/compiler_depend.make

# Include the progress variables for this target.
include modules/js/CMakeFiles/opencv.js.dir/progress.make

modules/js/CMakeFiles/opencv.js: bin/opencv.js
modules/js/CMakeFiles/opencv.js: bin/opencv_js.js

bin/opencv.js: bin/opencv_js.js
bin/opencv.js: /home/gnery/Desktop/OpenCV_4.6.0_build/opencv/modules/js/src/make_umd.py
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Generating ../../bin/opencv.js"
	cd /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/modules/js && /usr/bin/python3 /home/gnery/Desktop/OpenCV_4.6.0_build/opencv/modules/js/src/make_umd.py /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/bin/opencv_js.js /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/bin/opencv.js

opencv.js: bin/opencv.js
opencv.js: modules/js/CMakeFiles/opencv.js
opencv.js: modules/js/CMakeFiles/opencv.js.dir/build.make
.PHONY : opencv.js

# Rule to build all files generated by this target.
modules/js/CMakeFiles/opencv.js.dir/build: opencv.js
.PHONY : modules/js/CMakeFiles/opencv.js.dir/build

modules/js/CMakeFiles/opencv.js.dir/clean:
	cd /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/modules/js && $(CMAKE_COMMAND) -P CMakeFiles/opencv.js.dir/cmake_clean.cmake
.PHONY : modules/js/CMakeFiles/opencv.js.dir/clean

modules/js/CMakeFiles/opencv.js.dir/depend:
	cd /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/gnery/Desktop/OpenCV_4.6.0_build/opencv /home/gnery/Desktop/OpenCV_4.6.0_build/opencv/modules/js /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/modules/js /home/gnery/Desktop/OpenCV_4.6.0_build/build_wasm/modules/js/CMakeFiles/opencv.js.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : modules/js/CMakeFiles/opencv.js.dir/depend

