import { GlobalBubble } from '@components/GlobalBubble';
import { MainBubble } from '@components/MainBubble';
import Icon, { solidCircle } from '@libs/icons';
import { ChangeEvent, FC, useState } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const PreviewWebsite: FC = () => {
	const [currentUrl, setCurrentUrl] = useState<string>('');
	const [url, setUrl] = useState<string>('');
	function handleUrlChange(event: ChangeEvent<HTMLInputElement>) {
		setCurrentUrl(event.target.value);
	}
	const handleTry = () => {
		setUrl(currentUrl);
	};
	return (
		<PreviewContainer className="shadow p-0">
			<div className="m-2 ">
				<div className="headUrl">
					<div>
						<Icon
							path={solidCircle}
							fill="#dd0000"
							width="18px"
							height="18px"
							className="me-1"
							style={{ borderRadius: '50%' }}
						/>
						<Icon
							path={solidCircle}
							fill="#ddce00"
							width="18px"
							height="18px"
							className="me-1"
							style={{ borderRadius: '50%' }}
						/>
						<Icon
							path={solidCircle}
							fill="#00dd25"
							width="18px"
							height="18px"
							style={{ borderRadius: '50%' }}
						/>
					</div>
					<div className="ms-3">
						<input value={url} disabled />
					</div>
				</div>
				{url.length < 1 && (
					<div className="mainWrapper">
						<h1 style={{ color: '#D08547' }} className="mb-3">
							LAUNCH YOUR VIDEO BUBBLE PREVIEW HERE:
						</h1>

						<FloatingLabel
							label="https://example.com/"
							controlId="floatingInput"
							className="mb-3"
							style={{ width: '24rem' }}
						>
							<Form.Control
								onChange={handleUrlChange}
								autoComplete="off"
								type="text"
								placeholder="Paste URL here"
							/>
						</FloatingLabel>
						<Button
							onClick={handleTry}
							className="px-4 text-white"
							style={{ fontSize: '1rem', background: '#CD7D3B', border: 'none', fontWeight: 600 }}
						>
							Try it out
						</Button>
					</div>
				)}
				<div style={{ position: 'relative', overflow: 'hidden' }}>
					{/* <input type="text" value={url} onChange={handleUrlChange} /> */}
					{url.length > 0 && (
						<iframe src={url} style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
					)}
					<MainBubble layout={'laptop'} mode="demo" />
					<GlobalBubble mode="demo" />
				</div>
			</div>
		</PreviewContainer>
	);
};

const PreviewContainer = styled(Container)`
	/* overflow: hidden;
	position: relative; */
	margin: 2rem auto;
	.headUrl {
		display: flex;
		padding: 0.625rem;
		background-color: #e6e5e6;
	}
	.mainWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
	}
`;
