cmd_Makefile := cd ..; /usr/local/nvm/versions/node/v8.2.1/lib/node_modules/node-gyp/gyp/gyp_main.py -fmake --ignore-environment "--toplevel-dir=." -I/home/pi/AmiVoiceRobotSDK/nodejs/build/config.gypi -I/usr/local/nvm/versions/node/v8.2.1/lib/node_modules/node-gyp/addon.gypi -I/home/pi/.node-gyp/8.2.1/include/node/common.gypi "--depth=." "-Goutput_dir=." "--generator-output=build" "-Dlibrary=shared_library" "-Dvisibility=default" "-Dnode_root_dir=/home/pi/.node-gyp/8.2.1" "-Dnode_gyp_dir=/usr/local/nvm/versions/node/v8.2.1/lib/node_modules/node-gyp" "-Dnode_lib_file=/home/pi/.node-gyp/8.2.1/<(target_arch)/node.lib" "-Dmodule_root_dir=/home/pi/AmiVoiceRobotSDK/nodejs" "-Dnode_engine=v8" binding.gyp
