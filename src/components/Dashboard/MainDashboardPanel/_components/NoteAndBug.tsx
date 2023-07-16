import { DeleteFilled } from '@ant-design/icons';
import { openNotification } from '@components/common';
import { BorderContentBox } from '@components/Dashboard/NewBubble/BubbleSttings/_components/styles';
import { authAPI } from '@libs/api/auth';
import { Button, Col, Drawer, Empty, Input, List, Popconfirm, Row, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';

const { TextArea } = Input;

export const NoteAndBug: FC = () => {
	const [note, setNote] = useState<string>('');
	const [bug, setBug] = useState<string>('');
	const [loadingType, setLoadingType] = useState<'bug' | 'note'>(null);
	const [allBugs, setAllBugs] = useState([]);
	const [allNotes, setAllNotes] = useState([]);
	const [drawerType, setDrawerType] = useState<'bugs' | 'notes'>(null);
	const [deleteLoading, setDeleteLoading] = useState<'bug' | 'note'>(null);

	useEffect(() => {
		getBugs();
		getAllNotes();
	}, []);

	const handleAddNote = async () => {
		if (note.length > 0) {
			setLoadingType('note');
			try {
				const { error, message } = await authAPI.noteAdd(note);
				if (!error) {
					setNote('');
					getAllNotes();
					openNotification('topLeft', 'success', String(message));
				} else {
					openNotification('topLeft', 'error', String(message));
				}
			} catch (error) {
				openNotification('topLeft', 'error', String(error));
			} finally {
				setLoadingType(null);
			}
		} else {
			openNotification('topLeft', 'error', 'Note is empty!');
		}
	};
	const handleAddBug = async () => {
		if (bug.length > 0) {
			setLoadingType('bug');
			try {
				const { error, message } = await authAPI.bugAdd(bug);
				if (!error) {
					getBugs();
					setBug('');
					openNotification('topLeft', 'success', String(message));
				} else {
					openNotification('topLeft', 'error', String(message));
				}
			} catch (error) {
				openNotification('topLeft', 'error', String(error));
			} finally {
				setLoadingType(null);
			}
		} else {
			openNotification('topLeft', 'error', 'Bug is empty!');
		}
	};

	const getBugs = async () => {
		try {
			const { error, data, message } = await authAPI.getAllBug();
			if (!error) {
				setAllBugs(data);
			} else {
				openNotification('topLeft', 'error', String(message));
			}
		} catch (error) {
			openNotification('topLeft', 'error', String(error));
		} finally {
		}
	};
	const getAllNotes = async () => {
		try {
			const { error, data, message } = await authAPI.getAllNotes();
			if (!error) {
				setAllNotes(data);
			} else {
				openNotification('topLeft', 'error', String(message));
			}
		} catch (error) {
			openNotification('topLeft', 'error', String(error));
		} finally {
		}
	};

	const deleteNote = async (id: number) => {
		setDeleteLoading('note');
		try {
			const { error, message } = await authAPI.deleteNote(id);
			if (!error) {
				getAllNotes();
				openNotification('topLeft', 'success', String(message));
			}
		} catch (error) {
			openNotification('topLeft', 'error', String(error));
		} finally {
			setDeleteLoading(null);
		}
	};
	const deleteBug = async (id: number) => {
		setDeleteLoading('bug');
		try {
			const { error, message } = await authAPI.deleteBug(id);
			if (!error) {
				getBugs();
				openNotification('topLeft', 'success', String(message));
			}
		} catch (error) {
			openNotification('topLeft', 'error', String(error));
		} finally {
			setDeleteLoading(null);
		}
	};
	return (
		<>
			<Row gutter={18}>
				<Col lg={12} md={24} sm={24} xs={24} className="mb-3">
					<div style={{ borderRadius: '22px' }} className="bg-white p-3 ">
						<div className="d-flex justify-content-between">
							<h4 className="mb-4">Notes:</h4>
							<Button className="bg-dark text-white" onClick={() => setDrawerType('notes')}>
								View
							</Button>
						</div>
						<BorderContentBox content="Notes">
							<TextArea
								value={note}
								onChange={(e) => setNote(e.target.value)}
								bordered={false}
								placeholder="Add a Note"
								autoSize={{ minRows: 7, maxRows: 12 }}
							/>
						</BorderContentBox>
						<div className="p-3 text-center">
							<Button
								loading={loadingType === 'note'}
								onClick={handleAddNote}
								type="primary"
								className="text-white"
							>
								Add Note
							</Button>
						</div>
					</div>
				</Col>
				<Col lg={12} md={24} sm={24} xs={24}>
					<div style={{ borderRadius: '22px' }} className="bg-white p-3 ">
						<div className="d-flex justify-content-between">
							<h4 className="mb-4">Reports:</h4>
							<Button className="bg-dark text-white" onClick={() => setDrawerType('bugs')}>
								View
							</Button>
						</div>
						<BorderContentBox content="Find a Bug?">
							<TextArea
								value={bug}
								onChange={(e) => setBug(e.target.value)}
								bordered={false}
								placeholder="Add a bug"
								autoSize={{ minRows: 7, maxRows: 12 }}
							/>
						</BorderContentBox>
						<div className="p-3 text-center">
							<Button
								loading={loadingType === 'bug'}
								onClick={handleAddBug}
								type="primary"
								className="text-white"
							>
								Submit BUG
							</Button>
						</div>
					</div>
				</Col>
			</Row>

			<Drawer
				width={470}
				title={drawerType === 'bugs' ? 'Bug List' : drawerType === 'notes' ? 'Note List' : ''}
				placement="right"
				onClose={() => setDrawerType(null)}
				open={drawerType === 'notes' || drawerType === 'bugs'}
			>
				{drawerType === 'bugs' && allBugs.length > 0 ? (
					<Spin spinning={deleteLoading === 'bug'}>
						<List
							itemLayout="horizontal"
							dataSource={allBugs}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										description={
											<>
												<div className="d-flex justify-content-between align-items-center text-dark">
													{item.bug_text}
													<div>
														<Popconfirm
															placement="leftBottom"
															title={'Delete this item?'}
															description={''}
															onConfirm={() => deleteBug(item.id)}
															okText="Yes"
															cancelText="No"
														>
															<DeleteFilled />
														</Popconfirm>
													</div>
												</div>
												<small>{item.created_at}</small>
											</>
										}
									/>
								</List.Item>
							)}
						/>
					</Spin>
				) : drawerType === 'bugs' ? (
					<Empty />
				) : null}
				{drawerType === 'notes' && allNotes.length > 0 ? (
					<Spin spinning={deleteLoading === 'note'}>
						<List
							itemLayout="horizontal"
							dataSource={allNotes}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										description={
											<>
												<div className="d-flex justify-content-between align-items-center text-dark">
													{item.note_text}
													<div>
														<Popconfirm
															placement="leftBottom"
															title={'Delete this item?'}
															description={''}
															onConfirm={() => deleteNote(item.id)}
															okText="Yes"
															cancelText="No"
														>
															<DeleteFilled />
														</Popconfirm>
													</div>
												</div>
												<small>{item.created_at}</small>
											</>
										}
									/>
								</List.Item>
							)}
						/>
					</Spin>
				) : drawerType === 'notes' ? (
					<Empty />
				) : null}
			</Drawer>
		</>
	);
};
