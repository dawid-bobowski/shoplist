import React, { useEffect, useState } from 'react';
import useList from '../hooks/useList';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';

const Actionbar = ({ buttons }) => {
	const { list, isDarkMode } = useList();
	const [windowWidth, setWindowWidth] = useState(0);
	const [tipVisible, setTipVisible] = useState(true);

	useEffect(() => {
		const getWindowWidth = () => {
			setWindowWidth(window.innerWidth);
		}

		getWindowWidth();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setTipVisible(false);
		}, 3000);
	}, []);

	return (
		<div className={`btn-container${isDarkMode ? ' dark' : ''}`}>
			{
				buttons.map((button, index) => (
					<Tippy
						key={index}
						content={'Tap & hold to see what I\'m doing!'}
						visible={windowWidth < 992 && index === 1 && tipVisible}
					>
						<Tippy key={index} content={button.label}>
							<button
								className={`btn${isDarkMode ? ' dark' : ''}`}
								key={index}
								onClick={() => button.action(list.id)}
							>
								{button.icon}
							</button>
						</Tippy>
					</Tippy>
				))
			}
		</div>
	)
}

export default Actionbar;