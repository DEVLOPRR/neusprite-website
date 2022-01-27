import './styles/index.css';
import { ClientJS } from 'clientjs';
import SlimSelect from 'slim-select';
import './styles/slim-select.css';

const downloadBtnHolder = document.getElementById('downloadBtnHolder');

const URLs = {
	win32: {
		x64: 'https://github.com/DEVLOPRR/NeuSprite/releases/download/stable/NeuSprite-Win32_x64.7z',
		x86: 'https://github.com/DEVLOPRR/NeuSprite/releases/download/stable/NeuSprite-Win32_x86.7z'
	},
	linux: {
		x64: 'https://github.com/DEVLOPRR/NeuSprite/releases/download/stable/NeuSprite-Linux_x64.AppImage',
		x86: 'https://github.com/DEVLOPRR/NeuSprite/releases/download/stable/NeuSprite-Linux_x86.AppImage'
	},
}

const client = new ClientJS();
var is64Bit = true;

if (client.getCPU() != 'amd64') { 
	is64Bit = false;
}

var osSelector = new SlimSelect({
	select: '#osSelector',
	showSearch: false,
	onChange: (info) => {
		downloadBtnHolder.innerHTML = null;

		if (info.value == 'win32') {
			let btnAMD64 = document.createElement('a');
			btnAMD64.href = URLs.win32.x64;
			btnAMD64.innerText = 'Windows x64';

			let btnIA32 = document.createElement('a');
			btnIA32.href = URLs.win32.x86;
			btnIA32.innerText = 'Windows x86';

			if (is64Bit) {
				downloadBtnHolder.appendChild(btnAMD64);
				downloadBtnHolder.appendChild(btnIA32);	
			} else {
				downloadBtnHolder.appendChild(btnIA32);	
				downloadBtnHolder.appendChild(btnAMD64);
			}
		} else {
			let btnAMD64 = document.createElement('a');
			btnAMD64.href = URLs.linux.x64;
			btnAMD64.innerText = 'Linux x64';

			let btnIA32 = document.createElement('a');
			btnIA32.href = URLs.linux.x86;
			btnIA32.innerText = 'Linux x86';

			if (is64Bit) {
				downloadBtnHolder.appendChild(btnAMD64);
				downloadBtnHolder.appendChild(btnIA32);	
			} else {
				downloadBtnHolder.appendChild(btnIA32);	
				downloadBtnHolder.appendChild(btnAMD64);
			}
		}
	}
})

if (client.isWindows()) {
	osSelector.setSelected('win32');
} else if (client.isLinux()) {
	osSelector.setSelected('linux');
} else {
	osSelector.setSelected('win32');
}
