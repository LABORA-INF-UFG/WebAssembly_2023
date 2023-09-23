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
CMAKE_SOURCE_DIR = /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build

# Include any dependencies generated for this target.
include examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/compiler_depend.make

# Include the progress variables for this target.
include examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/progress.make

# Include the compile flags for this target's objects.
include examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/flags.make

examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.o: examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/flags.make
examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.o: ../examples/SimpleVideo/main.cpp
examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.o: examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.o"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.o -MF CMakeFiles/SimpleVideo.dir/main.cpp.o.d -o CMakeFiles/SimpleVideo.dir/main.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/SimpleVideo/main.cpp

examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/SimpleVideo.dir/main.cpp.i"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/SimpleVideo/main.cpp > CMakeFiles/SimpleVideo.dir/main.cpp.i

examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/SimpleVideo.dir/main.cpp.s"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/SimpleVideo/main.cpp -o CMakeFiles/SimpleVideo.dir/main.cpp.s

# Object files for target SimpleVideo
SimpleVideo_OBJECTS = \
"CMakeFiles/SimpleVideo.dir/main.cpp.o"

# External object files for target SimpleVideo
SimpleVideo_EXTERNAL_OBJECTS =

examples/SimpleVideo/SimpleVideo: examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/main.cpp.o
examples/SimpleVideo/SimpleVideo: examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/build.make
examples/SimpleVideo/SimpleVideo: libpango_display.so
examples/SimpleVideo/SimpleVideo: libpango_video.so
examples/SimpleVideo/SimpleVideo: libpango_windowing.so
examples/SimpleVideo/SimpleVideo: libpango_opengl.so
examples/SimpleVideo/SimpleVideo: /usr/lib/x86_64-linux-gnu/libGLEW.so
examples/SimpleVideo/SimpleVideo: /usr/lib/x86_64-linux-gnu/libOpenGL.so
examples/SimpleVideo/SimpleVideo: /usr/lib/x86_64-linux-gnu/libGLX.so
examples/SimpleVideo/SimpleVideo: /usr/lib/x86_64-linux-gnu/libGLU.so
examples/SimpleVideo/SimpleVideo: libpango_vars.so
examples/SimpleVideo/SimpleVideo: libpango_image.so
examples/SimpleVideo/SimpleVideo: libpango_packetstream.so
examples/SimpleVideo/SimpleVideo: libpango_core.so
examples/SimpleVideo/SimpleVideo: examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable SimpleVideo"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/SimpleVideo.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/build: examples/SimpleVideo/SimpleVideo
.PHONY : examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/build

examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/clean:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo && $(CMAKE_COMMAND) -P CMakeFiles/SimpleVideo.dir/cmake_clean.cmake
.PHONY : examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/clean

examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/depend:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/SimpleVideo /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : examples/SimpleVideo/CMakeFiles/SimpleVideo.dir/depend

