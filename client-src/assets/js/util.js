"use strict";

// Normalize to the form 999-999-9999
export const normalizePhoneNumber = phonenumber => {

	var phoneDigits = '';

	if (phonenumber) {

		for (let i = 0; i < phonenumber.length; ++i)
			if (phonenumber.charAt(i) >= '0' && phonenumber.charAt(i) <= '9')
				phoneDigits += phonenumber[i];
		if (phoneDigits.length != 10)
			return phonenumber;	// Leave things untouched
		else
			return phoneDigits.slice(0, 3) + '-' + phoneDigits.slice(3, 6) + '-' + phoneDigits.slice(6);
	}
};