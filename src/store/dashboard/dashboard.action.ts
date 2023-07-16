import store from '@store';
import { StateType, setLoading, setSubscriberDetails } from './dashboard.slice';

export const handleSetSubscriberInfo = async (data: StateType): Promise<void> => {
	store.dispatch(setSubscriberDetails(data));
};
export const handleSubscriptionLoading = async (isLoading: boolean): Promise<void> => {
	store.dispatch(setLoading(isLoading));
};
