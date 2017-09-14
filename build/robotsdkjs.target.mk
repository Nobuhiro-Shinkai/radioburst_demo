# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := robotsdkjs
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=robotsdkjs' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DLINUX' \
	'-DTIMELIMITED' \
	'-DFULLSERVICE' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++0x

INCS_Debug := \
	-I/home/pi/.node-gyp/8.2.1/include/node \
	-I/home/pi/.node-gyp/8.2.1/src \
	-I/home/pi/.node-gyp/8.2.1/deps/uv/include \
	-I/home/pi/.node-gyp/8.2.1/deps/v8/include \
	-I$(srcdir)/node_modules/nan \
	-I/home/pi/AmiVoiceRobotSDK/AmiVoiceRobotSDK/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=robotsdkjs' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DLINUX' \
	'-DTIMELIMITED' \
	'-DFULLSERVICE' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++0x

INCS_Release := \
	-I/home/pi/.node-gyp/8.2.1/include/node \
	-I/home/pi/.node-gyp/8.2.1/src \
	-I/home/pi/.node-gyp/8.2.1/deps/uv/include \
	-I/home/pi/.node-gyp/8.2.1/deps/v8/include \
	-I$(srcdir)/node_modules/nan \
	-I/home/pi/AmiVoiceRobotSDK/AmiVoiceRobotSDK/include

OBJS := \
	$(obj).target/$(TARGET)/RobotSDKJs.o \
	$(obj).target/$(TARGET)/voiceRecognizerJs.o \
	$(obj).target/$(TARGET)/handsfreeControlJs.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic

LDFLAGS_Release := \
	-pthread \
	-rdynamic

LIBS := \
	-L/home/pi/AmiVoiceRobotSDK/nodejs/../AmiVoiceRobotSDK/lib/raspbian \
	-lAmiVoiceRecognizer \
	-lAmiVoiceHandsfreeControl \
	-lxcwrapper

$(obj).target/robotsdkjs.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/robotsdkjs.node: LIBS := $(LIBS)
$(obj).target/robotsdkjs.node: TOOLSET := $(TOOLSET)
$(obj).target/robotsdkjs.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/robotsdkjs.node
# Add target alias
.PHONY: robotsdkjs
robotsdkjs: $(builddir)/robotsdkjs.node

# Copy this to the executable output path.
$(builddir)/robotsdkjs.node: TOOLSET := $(TOOLSET)
$(builddir)/robotsdkjs.node: $(obj).target/robotsdkjs.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/robotsdkjs.node
# Short alias for building this executable.
.PHONY: robotsdkjs.node
robotsdkjs.node: $(obj).target/robotsdkjs.node $(builddir)/robotsdkjs.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/robotsdkjs.node
