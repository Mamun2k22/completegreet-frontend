import Card from '@components/common/Card';
import { bubbleAPI } from '@libs/api';
import { IBubbleType } from '@libs/api/interfaces';
import { setHideCollapseHandler } from '@store/editButton/editButton.action';
import { editModeHandler } from '@store/user/user.actions';
import { handleSetCurrentButtonType } from '@store/video/video.actions';
import { Col, Empty, message, Row, Spin } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

export const BubbleCard: FC = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [checkLoading, setCheckLoading] = useState<any>({});
	const [messageApi, contextHolder] = message.useMessage();
	const [bubbles, setBubbles] = useState<any>([]);
	const [isTextCopied, setIsTextCopied] = useState<any>(false);
	const [currentItem, setCurrentItem] = useState<IBubbleType>(null);

	const getBubbleData = async () => {
		setLoading(true);
		try {
			const { error, data, message } = await bubbleAPI.getAllBubble();
			if (!error) {
				setBubbles(data);
			} else {
				messageApi.error(message);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (values: IBubbleType) => {
		setLoading(true);
		try {
			const { error, message } = await bubbleAPI.deleteBubble(values.id);
			if (!error) {
				messageApi.success(message);
				getBubbleData();
			} else {
				messageApi.error(message);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	const handleEdit = (value: IBubbleType) => {
		handleSetCurrentButtonType({
			buttonConfigPageType: 'bubble_config_2',
		});
		editModeHandler(true);
		setHideCollapseHandler();
		router.push(`/dashboard/new-bubble/bubble-edit/${value.bubble_code}`);
	};
	const handleEmbed = async (el: IBubbleType) => {
		// console.log(el);
		setCurrentItem(el);
		//window.CompleteGreet_ID=${el.bubble_code};(function (s, a, l, u, t, e) {t = a.createElement(l),e = a.getElementsByTagName(l)[0];t.async = 1;t.src = u;e.parentNode.insertBefore(t, e)})(window, document, 'script', '${process.env.apiUrl}/CompleteGreetInstallation.js');
		const script = `<script>window.CompleteGreet_ID="${el.bubble_code}";(function (s, a, l, u, t, e) {t = a.createElement(l),e = a.getElementsByTagName(l)[0];t.async = 1;t.src = u;e.parentNode.insertBefore(t, e)})(window, document, 'script', '${process.env.apiUrl}/js/CompleteGreetInstallation.js');</script>`;
		try {
			await navigator.clipboard.writeText(script);
			setIsTextCopied(true);

			setTimeout(() => {
				setIsTextCopied(false);
				setCurrentItem(null);
			}, 3000);
			// messageApi.success({
			// 	content: 'copied to clipboard',
			// 	style: { marginTop: '80vh' },
			// });
			message.success(
				<>
					<p className="mb-1">Copied to clipboard</p>
					<h6 className="mb-1">insert code between &lt;header&gt;</h6>
				</>,
			);
		} catch (err) {
			setIsTextCopied(false);
			message.error(String(err));
		}
	};

	const handleDeactivate = async (value: boolean, code: string) => {
		setCheckLoading({ code, loading: true });
		try {
			const { error, data, message } = await bubbleAPI.deactivateBubble(code, {
				deactivated: value === true ? 0 : 1,
			});
			if (!error) {
				messageApi.success(message);
				getBubbleData();
			} else {
				messageApi.error(message);
			}
		} catch (error) {
		} finally {
			setCheckLoading({ code, loading: false });
			setLoading(false);
		}
	};

	useEffect(() => {
		getBubbleData();
	}, []);

	return (
		<Spin spinning={loading}>
			{contextHolder}
			<Row gutter={18}>
				{bubbles?.length < 1 && (
					<Col span={24} className="mt-3 text-center ">
						<Empty description="No Bubble found!" />
					</Col>
				)}
				{bubbles?.map((item: IBubbleType, idx: number) => (
					<Col key={idx} xxl={6} xl={8} lg={8} md={12} sm={12} xs={24} className="mb-4">
						<Card
							data={item}
							currentItem={currentItem}
							isTextCopied={isTextCopied}
							checkLoading={checkLoading}
							getBubbleData={getBubbleData}
							deleteHandler={handleDelete}
							editHandler={handleEdit}
							embedHandler={handleEmbed}
							handleDeactivate={handleDeactivate}
						/>
					</Col>
				))}
			</Row>
		</Spin>
	);
};
