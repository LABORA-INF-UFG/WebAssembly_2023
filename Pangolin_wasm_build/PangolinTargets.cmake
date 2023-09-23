# Generated by CMake

if("${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION}" LESS 2.6)
   message(FATAL_ERROR "CMake >= 2.6.0 required")
endif()
cmake_policy(PUSH)
cmake_policy(VERSION 2.6...3.20)
#----------------------------------------------------------------
# Generated CMake target import file.
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Protect against multiple inclusion, which would fail when already imported targets are added once more.
set(_targetsDefined)
set(_targetsNotDefined)
set(_expectedTargets)
foreach(_expectedTarget pango_core pango_display pango_geometry pango_glgeometry pango_image pango_opengl pango_packetstream pango_plot pango_python pango_scene pango_tools pango_vars pango_video pango_windowing tinyobj)
  list(APPEND _expectedTargets ${_expectedTarget})
  if(NOT TARGET ${_expectedTarget})
    list(APPEND _targetsNotDefined ${_expectedTarget})
  endif()
  if(TARGET ${_expectedTarget})
    list(APPEND _targetsDefined ${_expectedTarget})
  endif()
endforeach()
if("${_targetsDefined}" STREQUAL "${_expectedTargets}")
  unset(_targetsDefined)
  unset(_targetsNotDefined)
  unset(_expectedTargets)
  set(CMAKE_IMPORT_FILE_VERSION)
  cmake_policy(POP)
  return()
endif()
if(NOT "${_targetsDefined}" STREQUAL "")
  message(FATAL_ERROR "Some (but not all) targets in this export set were already defined.\nTargets Defined: ${_targetsDefined}\nTargets not yet defined: ${_targetsNotDefined}\n")
endif()
unset(_targetsDefined)
unset(_targetsNotDefined)
unset(_expectedTargets)


# Create imported target pango_core
add_library(pango_core STATIC IMPORTED)

set_target_properties(pango_core PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS "_EMSCRIPTEN_"
  INTERFACE_COMPILE_FEATURES "cxx_decltype_auto"
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_core/include"
  INTERFACE_LINK_LIBRARIES "rt;Threads::Threads"
)

# Create imported target pango_display
add_library(pango_display STATIC IMPORTED)

set_target_properties(pango_display PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_display/include"
  INTERFACE_LINK_LIBRARIES "pango_core;pango_opengl;pango_windowing;pango_vars"
)

# Create imported target pango_geometry
add_library(pango_geometry STATIC IMPORTED)

set_target_properties(pango_geometry PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS "HAVE_EIGEN"
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_geometry/include"
  INTERFACE_LINK_LIBRARIES "pango_core;pango_image;tinyobj;Eigen3::Eigen"
)

# Create imported target pango_glgeometry
add_library(pango_glgeometry STATIC IMPORTED)

set_target_properties(pango_glgeometry PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_glgeometry/include"
  INTERFACE_LINK_LIBRARIES "pango_geometry;pango_opengl"
)

# Create imported target pango_image
add_library(pango_image STATIC IMPORTED)

set_target_properties(pango_image PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS "HAVE_EIGEN"
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_image/include"
  INTERFACE_LINK_LIBRARIES "pango_core;Eigen3::Eigen"
)

# Create imported target pango_opengl
add_library(pango_opengl STATIC IMPORTED)

set_target_properties(pango_opengl PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS "HAVE_EIGEN;HAVE_GLEW;HAVE_GLES;HAVE_GLES_2"
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_opengl/include"
  INTERFACE_LINK_LIBRARIES "pango_core;pango_image;Eigen3::Eigen"
)

# Create imported target pango_packetstream
add_library(pango_packetstream STATIC IMPORTED)

set_target_properties(pango_packetstream PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_packetstream/include"
  INTERFACE_LINK_LIBRARIES "pango_core"
)

# Create imported target pango_plot
add_library(pango_plot STATIC IMPORTED)

set_target_properties(pango_plot PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_plot/include"
  INTERFACE_LINK_LIBRARIES "pango_display"
)

# Create imported target pango_python
add_library(pango_python STATIC IMPORTED)

# Create imported target pango_scene
add_library(pango_scene STATIC IMPORTED)

set_target_properties(pango_scene PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_scene/include"
  INTERFACE_LINK_LIBRARIES "pango_opengl"
)

# Create imported target pango_tools
add_library(pango_tools STATIC IMPORTED)

set_target_properties(pango_tools PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_tools/include"
  INTERFACE_LINK_LIBRARIES "pango_display;pango_video"
)

# Create imported target pango_vars
add_library(pango_vars STATIC IMPORTED)

set_target_properties(pango_vars PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_vars/include"
  INTERFACE_LINK_LIBRARIES "pango_core"
)

# Create imported target pango_video
add_library(pango_video STATIC IMPORTED)

set_target_properties(pango_video PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_video/include;/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/include"
  INTERFACE_LINK_LIBRARIES "pango_core;pango_image;pango_packetstream"
)

# Create imported target pango_windowing
add_library(pango_windowing STATIC IMPORTED)

set_target_properties(pango_windowing PROPERTIES
  INTERFACE_COMPILE_DEFINITIONS "PANGO_DEFAULT_WIN_URI=\"emscripten\""
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/pango_windowing/include;/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/include"
  INTERFACE_LINK_LIBRARIES "pango_core;pango_opengl"
)

# Create imported target tinyobj
add_library(tinyobj STATIC IMPORTED)

set_target_properties(tinyobj PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/components/tinyobj/include"
)

# Import target "pango_core" for configuration "Release"
set_property(TARGET pango_core APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_core PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_core.a"
  )

# Import target "pango_display" for configuration "Release"
set_property(TARGET pango_display APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_display PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_display.a"
  )

# Import target "pango_geometry" for configuration "Release"
set_property(TARGET pango_geometry APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_geometry PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_geometry.a"
  )

# Import target "pango_glgeometry" for configuration "Release"
set_property(TARGET pango_glgeometry APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_glgeometry PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_glgeometry.a"
  )

# Import target "pango_image" for configuration "Release"
set_property(TARGET pango_image APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_image PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_image.a"
  )

# Import target "pango_opengl" for configuration "Release"
set_property(TARGET pango_opengl APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_opengl PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_opengl.a"
  )

# Import target "pango_packetstream" for configuration "Release"
set_property(TARGET pango_packetstream APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_packetstream PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_packetstream.a"
  )

# Import target "pango_plot" for configuration "Release"
set_property(TARGET pango_plot APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_plot PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_plot.a"
  )

# Import target "pango_python" for configuration "Release"
set_property(TARGET pango_python APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_python PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_python.a"
  )

# Import target "pango_scene" for configuration "Release"
set_property(TARGET pango_scene APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_scene PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_scene.a"
  )

# Import target "pango_tools" for configuration "Release"
set_property(TARGET pango_tools APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_tools PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_tools.a"
  )

# Import target "pango_vars" for configuration "Release"
set_property(TARGET pango_vars APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_vars PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_vars.a"
  )

# Import target "pango_video" for configuration "Release"
set_property(TARGET pango_video APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_video PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_video.a"
  )

# Import target "pango_windowing" for configuration "Release"
set_property(TARGET pango_windowing APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(pango_windowing PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libpango_windowing.a"
  )

# Import target "tinyobj" for configuration "Release"
set_property(TARGET tinyobj APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(tinyobj PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "CXX"
  IMPORTED_LOCATION_RELEASE "/home/gnery/Desktop/PangolinBuild_Wasm/Pangolin/build/libtinyobj.a"
  )

# This file does not depend on other imported targets which have
# been exported from the same project but in a separate export set.

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
cmake_policy(POP)
