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
include CMakeFiles/pango_packetstream.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/pango_packetstream.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/pango_packetstream.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/pango_packetstream.dir/flags.make

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o: CMakeFiles/pango_packetstream.dir/flags.make
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o: ../components/pango_packetstream/src/packet.cpp
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o: CMakeFiles/pango_packetstream.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o -MF CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o.d -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packet.cpp

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packet.cpp > CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.i

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packet.cpp -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.s

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o: CMakeFiles/pango_packetstream.dir/flags.make
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o: ../components/pango_packetstream/src/packetstream.cpp
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o: CMakeFiles/pango_packetstream.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o -MF CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o.d -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream.cpp

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream.cpp > CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.i

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream.cpp -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.s

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o: CMakeFiles/pango_packetstream.dir/flags.make
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o: ../components/pango_packetstream/src/packetstream_reader.cpp
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o: CMakeFiles/pango_packetstream.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o -MF CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o.d -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream_reader.cpp

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream_reader.cpp > CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.i

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream_reader.cpp -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.s

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o: CMakeFiles/pango_packetstream.dir/flags.make
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o: ../components/pango_packetstream/src/packetstream_writer.cpp
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o: CMakeFiles/pango_packetstream.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o -MF CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o.d -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream_writer.cpp

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream_writer.cpp > CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.i

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/packetstream_writer.cpp -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.s

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o: CMakeFiles/pango_packetstream.dir/flags.make
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o: ../components/pango_packetstream/src/playback_session.cpp
CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o: CMakeFiles/pango_packetstream.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o -MF CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o.d -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o -c /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/playback_session.cpp

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/playback_session.cpp > CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.i

CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/src/playback_session.cpp -o CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.s

# Object files for target pango_packetstream
pango_packetstream_OBJECTS = \
"CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o" \
"CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o" \
"CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o" \
"CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o" \
"CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o"

# External object files for target pango_packetstream
pango_packetstream_EXTERNAL_OBJECTS =

libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packet.cpp.o
libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream.cpp.o
libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_reader.cpp.o
libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/packetstream_writer.cpp.o
libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/components/pango_packetstream/src/playback_session.cpp.o
libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/build.make
libpango_packetstream.so: libpango_core.so
libpango_packetstream.so: CMakeFiles/pango_packetstream.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Linking CXX shared library libpango_packetstream.so"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/pango_packetstream.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/pango_packetstream.dir/build: libpango_packetstream.so
.PHONY : CMakeFiles/pango_packetstream.dir/build

CMakeFiles/pango_packetstream.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/pango_packetstream.dir/cmake_clean.cmake
.PHONY : CMakeFiles/pango_packetstream.dir/clean

CMakeFiles/pango_packetstream.dir/depend:
	cd /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build /home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/CMakeFiles/pango_packetstream.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/pango_packetstream.dir/depend

