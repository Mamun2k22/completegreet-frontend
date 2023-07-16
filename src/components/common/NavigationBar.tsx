import { useWindowSize } from '@libs/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Navbar } from 'react-bootstrap';
import { BigScreenItems, SmallScreen } from './_NavComponents';
export const NavigationBar: FC = () => {
	const router = useRouter();
	// const { isDesktop, isLaptop, isMobile } = useResponsive();
	const { width } = useWindowSize();

	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const handleOffcanvasToggle = () => {
		setShowOffcanvas(!showOffcanvas);
	};
	const handleClose = () => {
		setShowOffcanvas(false);
	};
	return (
		<Navbar collapseOnSelect key="md" expand="md" bg="white" className="py-3 px-5" sticky="top">
			<Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
				<Image src="/images/top-logo.png" alt="logo" width={180} height={56} />
			</Navbar.Brand>

			{width > 772 && <BigScreenItems />}
			<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={handleOffcanvasToggle} />
			{width <= 772 && <SmallScreen showOffcanvas={showOffcanvas} handleClose={handleClose} />}
		</Navbar>
	);
};
