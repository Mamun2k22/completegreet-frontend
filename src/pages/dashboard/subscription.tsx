import { Packages } from '@components/PricingItems';
import { DashboardLayout } from '@components/templates';
import { bubbleAPI } from '@libs/api';
import { getUserState } from '@store/actions';
import { Spin, message as msg } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Subscription: NextPage = () => {
	const router = useRouter();
	const { profile } = useSelector(getUserState);

	const [isPlanChange, setIsPlanChange] = useState(false);
	const [planData, setPlanData] = useState<any>({});
	const [loading, setLoading] = useState(false);
	const [allPackage, setAllPackage] = useState<any>([]);

	const getDashboardDetails = async () => {
		setLoading(true);
		try {
			const { data, error, message } = await bubbleAPI.getSubscriberOverview(profile.id);
			if (!error) {
				getSinglePlan(data.plan_id);
			} else {
				msg.error(message);
			}
		} catch (error) {
			msg.error(String(error));
		} finally {
			setLoading(false);
		}
	};

	const getSinglePlan = async (id: number) => {
		const { data, error, message } = await bubbleAPI.getSinglePlan(id);
		if (!error) {
			setPlanData(data);
		} else {
			msg.error(message);
		}
	};

	const handleChangePlan = async () => {
		try {
			const { data, error, message } = await bubbleAPI.getAllPackages();
			if (!error) {
				setAllPackage(data);
				setIsPlanChange(true);
			} else {
				msg.error(message);
			}
		} catch (error) {
			msg.error(String(error));
		}
	};

	useEffect(() => {
		getDashboardDetails();
	}, []);

	useEffect(() => {
		// console.log({ router });

		if (router.query?.mode) {
			handleChangePlan();
		}
	}, [router.query]);

	return (
		<DashboardLayout>
			{!isPlanChange && (
				<div>
					<Spin spinning={loading}>
						<div className="bg-white p-3 rounded  d-flex justify-content-center align-items-center ">
							<div className="my-auto p-5 rounded shadow">
								<h1 style={{ fontWeight: 600 }} className="text-secondary text-center">
									Subscription information
								</h1>
								<div style={{ maxWidth: '400px', margin: 'auto' }} className="mt-4">
									<div className="mb-2" style={{ fontSize: '1rem' }}>
										<span>Subscription Plan: </span>
										<b>{planData?.pname}</b>
									</div>
									<div className="mb-2" style={{ fontSize: '1rem' }}>
										<span>Price: </span>
										<b>${planData?.price}</b>
									</div>
									<div className="mb-2" style={{ fontSize: '1rem' }}>
										<span>Duration: </span>
										<b>{planData?.duration} Month</b>
									</div>
									<div className="mb-2" style={{ fontSize: '1rem' }}>
										<span>Visitors Capacity: </span>
										<b>{planData?.visitor} Unique Visitors per month</b>
									</div>
									<div className="mb-2" style={{ fontSize: '1rem' }}>
										<span>Subscription End Date: </span>
										<b>Wed, 29 Mar 2023</b>
									</div>
									<div className="text-center mt-4">
										<Button onClick={handleChangePlan} className="text-white">
											Change Plan
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Spin>
				</div>
			)}
			<PriceContainer isPlanChange={isPlanChange}>
				<div className="py-4">
					<Packages data={allPackage} currentPlan={planData} />
				</div>
			</PriceContainer>
		</DashboardLayout>
	);
};

const PriceContainer = styled.div<{ isPlanChange: boolean }>`
	background-color: var(--bs-white);
	margin: 0.425rem 0;
	overflow: hidden;
	transition: 0.6s;
	height: ${({ isPlanChange }) => (isPlanChange ? 'auto' : '0px')};
`;

export default Subscription;
