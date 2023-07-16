import { BaseAPI } from './baseApi';
import { BR, IBubbleType, IChatHistory, IChatList } from './interfaces';

class BubbleAPI extends BaseAPI {
	constructor(baseURL: string) {
		super(baseURL);
	}
	createBubble = (payload: IBubbleType) => this.post<BR<IBubbleType>>('api/v1/bubble/create', payload);
	updateBubble = (payload: IBubbleType) => this.patch<BR<IBubbleType>>('api/v1/bubble/edit/' + payload.id, payload);
	uploadBubbleVideo = (videoData: FormData) => this.postForm<BR<any>>('api/v1/bubble/video_upload', videoData);

	getAllBubble = () => this.get<BR<IBubbleType>>(`api/v1/bubble/all_bubble`);
	getSingleBubble = (code: string) => this.get<BR<any[]>>(`api/v1/bubble/single_bubble/${code}`);
	deleteBubble = (id: number) => this.patch<BR<any>>(`api/v1/bubble/delete/${id}`);
	deactivateBubble = (code: string, payload: any) =>
		this.patch<BR<any>>(`api/v1/bubble/deactivated/${code}`, payload);

	getChatList = (id: number) => this.get<BR<IChatList[]>>(`api/v1/get-chat?hoster_id=${id}`);
	getChatHistory = (id: number) => this.get<BR<IChatHistory[]>>(`api/v1/get-message?chat_id=${id}`);
	getMessages = (Cookies: string, BubbleID: string) => this.post<BR<any>>('get-chat-info', { Cookies, BubbleID });
	getCheckoutInfo = (payload: any) => this.post<BR<any>>('api/v1/create-payment-intent', payload);
	updateBubbleName = (name: any, id: number) =>
		this.patch<BR<any>>(`api/v1/bubble/edit/${id}`, { bubble_name: name });

	getAllPackages = () => this.get<BR<any>>(`get_all_plan`);

	getSinglePackage = (code: string, days: string) => this.get<BR<any>>(`api/v1/checkout/${code}?dur=${days}`);

	webHook = (payload: any) => this.post<BR<any>>('api/v1/webhook', payload);
	getSubscriberOverview = (id: number) => this.get<BR<any>>(`api/v1/get-subscriber-overview/${id}`);
	getSinglePlan = (id: number) => this.get<BR<any>>(`api/v1/get_single_plan/${id}`);
	getSubscriberInfo = (id: number) => this.get<BR<any>>(`get-subscriber-by-id/${id}`);
}

export const bubbleAPI = new BubbleAPI(process.env.apiUrl);
