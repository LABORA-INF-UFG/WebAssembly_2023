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
include examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/compiler_depend.make

# Include the progress variables for this target.
include examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/progress.make

# Include the compile flags for this target's objects.
include examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/flags.make

examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o: examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/flags.make
examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o: ../examples/BasicOpenGL/3_gl_intro_classic_triangle_vbo_shader.cpp
examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o: examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o -MF CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o.d -o CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/BasicOpenGL/3_gl_intro_classic_triangle_vbo_shader.cpp

examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.i"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/BasicOpenGL/3_gl_intro_classic_triangle_vbo_shader.cpp > CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.i

examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.s"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/BasicOpenGL/3_gl_intro_classic_triangle_vbo_shader.cpp -o CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.s

# Object files for target tutorial_3_gl_intro_classic_triangle_vbo_shader
tutorial_3_gl_intro_classic_triangle_vbo_shader_OBJECTS = \
"CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o"

# External object files for target tutorial_3_gl_intro_classic_triangle_vbo_shader
tutorial_3_gl_intro_classic_triangle_vbo_shader_EXTERNAL_OBJECTS =

examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/3_gl_intro_classic_triangle_vbo_shader.cpp.o
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/build.make
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: libpango_display.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: libpango_windowing.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: libpango_opengl.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: libpango_image.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: /usr/lib/x86_64-linux-gnu/libGLEW.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: /usr/lib/x86_64-linux-gnu/libOpenGL.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: /usr/lib/x86_64-linux-gnu/libGLX.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: /usr/lib/x86_64-linux-gnu/libGLU.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: libpango_vars.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: libpango_core.so
examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader: examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable tutorial_3_gl_intro_classic_triangle_vbo_shader"
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/build: examples/BasicOpenGL/tutorial_3_gl_intro_classic_triangle_vbo_shader
.PHONY : examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/build

examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/clean:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL && $(CMAKE_COMMAND) -P CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/cmake_clean.cmake
.PHONY : examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/clean

examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/depend:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/examples/BasicOpenGL /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : examples/BasicOpenGL/CMakeFiles/tutorial_3_gl_intro_classic_triangle_vbo_shader.dir/depend

