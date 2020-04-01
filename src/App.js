import React, { useRef, useEffect, useState, useMemo } from 'react'
import './App.scss'
import { Row, Col, Dropdown, Button } from 'react-bootstrap'
import CircleProgress from './circleProgress'
import { Line } from 'react-chartjs-2'

const ReportItem = ({ title, count }) => (
	<div className="text-uppercase text-white">
		<p className="mb-0">{title}</p>
		<p>
			<span className="h1 text-bold mr-3">{count}</span>
			<span className="text-white-50">problems</span>
		</p>
	</div>
)

const lineData = {
	data: {
		labels: ['2015', '2016', '2017', '2018'],
		datasets: [
			{
				label: 'My First dataset',
				fill: false,
				lineTension: 0,
				clip: { left: 5, top: false, right: -2, bottom: 0 },
				backgroundColor: '#1E2025',
				borderColor: 'white',
				borderCapStyle: 'butt',
				pointBackgroundColor: 'white',
				pointRadius: 5,
				data: [37, 60, 40, 70]
			}
		]
	},
	options: {
		scales: {
			yAxes: [
				{
					ticks: {
						max: 80,
						min: 10,
						stepSize: 10,
						callback: (val, idx, vals) => {
							return idx % 2 === 1 ? '' : val
						}
					},
					gridLines: {
						color: 'gray'
					}
				}
			],
			xAxes: [
				{
					offset: true,
					gridLines: {
						display: false
					}
				}
			]
		}
	}
}

const CustomInput = ({
	className = '',
	defaultFocus,
	onChange,
	value,
	...rest
}) => {
	const inputRef = useRef(),
		wrapRef = useRef()

	const handleChange = e => {
		const val = e.target.value

		if (/[^0-9./]/.test(val) || val.length > 1) {
			return
		}

		onChange(val)
	}

	const handleFocus = () => {
		inputRef.current.classList.remove('hasVal')
		wrapRef.current.classList.add('inputWrap-focus')
	}

	useEffect(() => {
		if (defaultFocus) {
			inputRef.current.focus()
		}
	}, [defaultFocus])

	return (
		<div ref={wrapRef} className={`inputWrap ${className}`}>
			<div className="inputWrap-inner">
				<input
					ref={inputRef}
					type="text"
					className={`h1 ${!!value ? 'hasVal' : ''}`}
					{...rest}
					onChange={handleChange}
					value={value}
					onFocus={handleFocus}
					onBlur={() => {
						wrapRef.current.classList.remove('inputWrap-focus')
					}}
				/>
			</div>
		</div>
	)
}

const App = () => {
	const [inputVals, setInputVals] = useState(['', '', '', ''])

	const handleChangeInputFns = useMemo(() => {
		return [1, 2, 3, 4].map((_, idx) => {
			return val => {
				setInputVals(prev => {
					return prev.map((item, idx2) => {
						return idx2 === idx ? val : item
					})
				})
			}
		})
	}, [])

	const completeInput = inputVals.every(item => !!item)

	const dropDown1Source = [
		'All Topics',
		'Algebra',
		'Grometry',
		'Trignometry',
		'Arthmetic'
	]
	const [selectedIdx1, setSelectedIdx1] = useState(0)
	const handleChangeDropdown1 = idx => {
		setSelectedIdx1(idx)
	}

	return (
		<div className="container-fluid">
			<Row>
				<Col md={2} className="sidebar d-none d-sm-block">
					<CircleProgress progress={65} className="my-5 " />
					<ReportItem title="completed" count="100" />
					<ReportItem title="correct" count="100" />

					<p className="text-postDate fixed-bottom ml-3">
						Post 24 Hours, 20200401
					</p>
				</Col>

				<Col className="sidebar d-block d-sm-none">
					<Row>
						<Col>
							<CircleProgress progress={65} />
						</Col>
						<Col>
							<ReportItem title="completed" count="100" />
							<ReportItem title="correct" count="100" />
						</Col>
					</Row>
				</Col>

				<Col className="main pt-5 px-5">
					<Row>
						<Dropdown className="col-auto px-0 mr-2">
							<div className="gradientWrap">
								<Dropdown.Toggle variant="gradient">
									<span className="gradientTxt">
										{dropDown1Source[selectedIdx1]}
									</span>
								</Dropdown.Toggle>
							</div>
							<Dropdown.Menu>
								<Dropdown.Header>Topic</Dropdown.Header>
								{dropDown1Source.map((item, idx) => {
									return (
										<Dropdown.Item
											key={idx}
											onClick={() => handleChangeDropdown1(idx)}
										>
											{item}
										</Dropdown.Item>
									)
								})}
								{/* <Dropdown.Item href="#/action-1">All Topics</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Algebra</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Grometry</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Trignometry</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Arthmetic</Dropdown.Item> */}
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown className="col-auto px-0 mr-2">
							<div className="gradientWrap">
								<Dropdown.Toggle variant="gradient">
									<span className="gradientTxt">Popular</span>
								</Dropdown.Toggle>
							</div>
							<Dropdown.Menu>
								<Dropdown.Header>Dropdown header</Dropdown.Header>
								<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown className="col-auto px-0 mr-2">
							<div className="gradientWrap">
								<Dropdown.Toggle variant="gradient">
									<span className="gradientTxt">Popular</span>
								</Dropdown.Toggle>
							</div>
							<Dropdown.Menu>
								<Dropdown.Header>Dropdown header</Dropdown.Header>
								<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown className="col-auto px-0 mr-2">
							<div className="gradientWrap">
								<Dropdown.Toggle variant="gradient">
									<span className="gradientTxt">More Filter</span>
								</Dropdown.Toggle>
							</div>
							<Dropdown.Menu>
								<Dropdown.Header>Dropdown header</Dropdown.Header>
								<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Row>

					<div className="content">
						<Row className="align-items-center border-bottom border-gray pb-3">
							<Col>
								<Row className="align-items-center">
									<Col xs="auto">
										<i class="fas fa-calculator" />
									</Col>
									<Col xs="auto">
										<div>
											<span className="text-warning">Arithmetic</span>
											　●　
											<span className="text-warning">Real Problems</span>
										</div>
									</Col>
								</Row>
							</Col>
							<Col xs={false} md="auto">
								<Button variant="formula">
									<i class="fas fa-superscript mr-2" />
									Formula
								</Button>
							</Col>
						</Row>
						<Row className="align-items-center mb-3">
							<Col>
								<p className="mt-3">
									orem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's
									standard dummy text ever since the 1500s, when an unknown
									printer took a galley of type and scrambled it to make a type
									specimen book. It has survived not only five centuries, but
									also the leap into electronic typesetting, remaining
									essentially unchanged. It was popularised in the 1960s with
									the release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing software
									like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
								<Line {...lineData} />
								<Row className="mt-3 mx-0">
									<Col xs="auto px-0 mr-2">
										<Button variant="hashTag">Tag A</Button>
									</Col>
									<Col xs="auto px-0 mr-2">
										<Button variant="hashTag">Tag B</Button>
									</Col>
									<Col xs="auto px-0">
										<Button variant="hashTag">Tag C</Button>
									</Col>
								</Row>
							</Col>
							<Col>
								<Row className="align-items-center justify-content-center">
									{inputVals.map((val, idx) => {
										return (
											<CustomInput
												key="idx"
												className={idx < inputVals.length - 1 ? 'mr-2' : ''}
												placeholder={idx + 1}
												defaultFocus={idx === 0}
												value={val}
												onChange={handleChangeInputFns[idx]}
											/>
										)
									})}
								</Row>
								<Row className="justify-content-end">
									{completeInput && (
										<p className="text-white-50">
											Press <span className="text-white">Enter↲</span>
										</p>
									)}
								</Row>
							</Col>
						</Row>

						<Row className="justify-content-end">
							<div className="submitBtnWrap mr-2">
								<Button variant="submit">Skip</Button>
							</div>
							<div
								className={`submitBtnWrap ${
									!completeInput ? 'submitBtnWrap-disabled' : ''
								}`}
							>
								<Button variant="submit" disabled={!completeInput}>
									Submit
								</Button>
							</div>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default App
