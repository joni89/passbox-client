export enum DeviceType {
	PHONE = 'PHONE',
	TABLET = 'TABLET',
	COMPUTER = 'COMPUTER'
}

const userAgent: string = navigator.userAgent
	|| navigator.vendor
	// @ts-ignore
	|| window.opera
;

const currentDeviceType: DeviceType = (() => {
	if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(userAgent)) {
		return DeviceType.TABLET;
	} else if (/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/i.test(userAgent)) {
		return DeviceType.PHONE;
	} else {
		return DeviceType.COMPUTER;
	}
})();

export function getCurrentDeviceType(): DeviceType {
	return currentDeviceType;
}

export function isMobileDevice(deviceType: DeviceType = currentDeviceType): boolean {
	switch (deviceType) {
		case DeviceType.TABLET:
		case DeviceType.PHONE:
			return true;
		default:
			return false;
	}
}
