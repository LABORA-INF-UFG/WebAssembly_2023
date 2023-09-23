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
include tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/compiler_depend.make

# Include the progress variables for this target.
include tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/progress.make

# Include the compile flags for this target's objects.
include tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/flags.make

tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o: tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/flags.make
tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o: ../tools/VideoJson/main-print.cpp
tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o: tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o -MF CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o.d -o CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/tools/VideoJson/main-print.cpp

tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/VideoJsonPrint.dir/main-print.cpp.i"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/tools/VideoJson/main-print.cpp > CMakeFiles/VideoJsonPrint.dir/main-print.cpp.i

tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/VideoJsonPrint.dir/main-print.cpp.s"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/tools/VideoJson/main-print.cpp -o CMakeFiles/VideoJsonPrint.dir/main-print.cpp.s

# Object files for target VideoJsonPrint
VideoJsonPrint_OBJECTS = \
"CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o"

# External object files for target VideoJsonPrint
VideoJsonPrint_EXTERNAL_OBJECTS =

tools/VideoJson/VideoJsonPrint: tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/main-print.cpp.o
tools/VideoJson/VideoJsonPrint: tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/build.make
tools/VideoJson/VideoJsonPrint: libpango_glgeometry.so
tools/VideoJson/VideoJsonPrint: libpango_plot.so
tools/VideoJson/VideoJsonPrint: libpango_python.so
tools/VideoJson/VideoJsonPrint: libpango_scene.so
tools/VideoJson/VideoJsonPrint: libpango_tools.so
tools/VideoJson/VideoJsonPrint: libpango_video.so
tools/VideoJson/VideoJsonPrint: libpango_geometry.so
tools/VideoJson/VideoJsonPrint: libtinyobj.so
tools/VideoJson/VideoJsonPrint: libpango_display.so
tools/VideoJson/VideoJsonPrint: libpango_vars.so
tools/VideoJson/VideoJsonPrint: libpango_windowing.so
tools/VideoJson/VideoJsonPrint: libpango_opengl.so
tools/VideoJson/VideoJsonPrint: /usr/lib/x86_64-linux-gnu/libGLEW.so
tools/VideoJson/VideoJsonPrint: /usr/lib/x86_64-linux-gnu/libOpenGL.so
tools/VideoJson/VideoJsonPrint: /usr/lib/x86_64-linux-gnu/libGLX.so
tools/VideoJson/VideoJsonPrint: /usr/lib/x86_64-linux-gnu/libGLU.so
tools/VideoJson/VideoJsonPrint: libpango_image.so
tools/VideoJson/VideoJsonPrint: libpango_packetstream.so
tools/VideoJson/VideoJsonPrint: libpango_core.so
tools/VideoJson/VideoJsonPrint: tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable VideoJsonPrint"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/VideoJsonPrint.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/build: tools/VideoJson/VideoJsonPrint
.PHONY : tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/build

tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/clean:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson && $(CMAKE_COMMAND) -P CMakeFiles/VideoJsonPrint.dir/cmake_clean.cmake
.PHONY : tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/clean

tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/depend:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/tools/VideoJson /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : tools/VideoJson/CMakeFiles/VideoJsonPrint.dir/depend

