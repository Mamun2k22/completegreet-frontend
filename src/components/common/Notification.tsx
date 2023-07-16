import { notification } from 'antd';
import type { IconType, NotificationPlacement } from 'antd/es/notification/interface';

export const openNotification = (
	placement: NotificationPlacement,
	type: IconType,
	message: string,
	description?: string,
) => {
	notification.info({
		type: type || 'info',
		message: `${message}`,
		description: `${description || ''}`,
		placement,
	});
};

export const Notification = () => {
	const [, contextHolder] = notification.useNotification();
	return <>{contextHolder}</>;
};
