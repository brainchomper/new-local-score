import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Avatar, Mask, Fa, View, Button } from 'mdbreact';

const TeamPage = () => {
	return (
		<Container>
			<section className="pt-4">
				{/* <h2 className="h1-responsive font-weight-bold my-5">Our amazing team</h2>
				<p className="grey-text w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.</p> */}
				<Row className="text-center">

					{/* John*/}
					<Col lg="3" md="6" className="mb-lg-0 mb-5">
						<Avatar tag="img" src="./images/team/john.png" className="rounded-circle hoverable z-depth-1 img-fluid" alt="Sample avatar" />
						<h5 className="font-weight-bold mt-4 mb-3">John Stuart</h5>
						<p className="text-uppercase blue-text">Full Stack Web Developer<br/>API Brain</p>
						<p className="grey-text hoverable px-2	 ">Full MERN Developer focused on API building and Data Structure<br/>I like smol dogs, coffee and coding.</p>
						<p className = "grey-text"></p>
						<img src="./images/team/QRJohn.png" alt="Kevin Smith PNG" className="img-fluid px-4" href="https://kvnsmith.com" target="blank" />

						<ul className="list-unstyled mb-0">
						<a className="p-2 fa-lg" target="blank" href="https://github.com/johnstuart670">
						<Fa icon="github" className="blue-text" />
					</a>
					<a className="p-2 fa-lg" target="blank" href="https://www.linkedin.com/in/john-stuart-78b523a9/">
						<Fa icon="linkedin" className="blue-text" />
					</a>
						</ul>
					</Col>
					{/* /John */}

					{/* Kevin */}
					<Col lg="3" md="6" className="mb-lg-0 mb-5">
						<Avatar tag="img" src="./images/team/kvn.png" className="hoverable rounded-circle z-depth-1 img-fluid" alt="Sample avatar" />
						<h5 className="font-weight-bold mt-4 mb-3">Kevin Smith</h5>
						<p className="text-uppercase blue-text">Full Stack Web Developer<br/>Frontend Mastermind</p>
						<p className="grey-text hoverable px-2">Full MERN Developer specializing in Front End Developement.<br/>
						<img src="./images/team/QRKevin.png" alt="Kevin Smith PNG" className="img-fluid px-4" href="https://kvnsmith.com" target="blank" />
						<ul className="list-unstyled mb-0">
							<a className="p-2 fa-lg" target="blank" href="https://github.com/brainchomper">
								<Fa icon="github" className="blue-text" />
							</a>
							<a className="p-2 fa-lg" target="blank" href="https://www.linkedin.com/in/kvnsmith">
								<Fa icon="linkedin" className="blue-text" />
							</a>
							<a className="p-2 fa-lg">
								<Fa icon="twitter" target="blank" href="https://twitter.com/_kvnsmith" className="blue-text" />
							</a>
						</ul>
						<a href="https://kvnsmith.com">kvnsmith.com</a></p>

					</Col>
					{/* /Kevin */}

					{/* Joe */}
					<Col lg="3" md="6" className="mb-lg-0 mb-5">
						<Avatar tag="img" src="./images/team/joe.png" className="rounded-circle z-depth-1 img-fluid" alt="Sample avatar" />
						<h5 className="font-weight-bold mt-4 mb-3">Joe Calderon</h5>
						<p className="text-uppercase blue-text">Full Stack Web Developer<br/>Something Here</p>
						<p className="grey-text hoverable ">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim est fugiat nulla id eu laborum.</p>
						<img src="./images/team/QRJoe.png" alt="Kevin Smith PNG" className="img-fluid px-4" href="https://kvnsmith.com" target="blank" />

						<ul className="list-unstyled mb-0">
							<a className="p-2 fa-lg" target="blank" href="https://github.com/gbert254">
								<Fa icon="github" className="blue-text" />
							</a>
							<a className="p-2 fa-lg" target="blank" href="https://www.linkedin.com/in/joseph-calderon/">
								<Fa icon="linkedin" className="blue-text" />
							</a>
						</ul>
					</Col>
					{/* /Joe */}

					{/* Alex */}
					<Col lg="3" md="6" className="mb-lg-0 mb-5">
						<Avatar tag="img" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg" className="rounded-circle z-depth-1 img-fluid" alt="Sample avatar" />
						<h5 className="font-weight-bold mt-4 mb-3">Alex Butler</h5>
						<p className="text-uppercase blue-text">Backend Developer</p>
						<p className="grey-text">Perspiciatis repellendus ad odit consequuntur, eveniet earum nisi qui consectetur totam officia voluptates perferendis voluptatibus aut.</p>
						<ul className="list-unstyled mb-0">
							<a className="p-2 fa-lg">
								<Fa icon="facebook" className="blue-text" />
							</a>
							<a className="p-2 fa-lg">
								<Fa icon="github" className="blue-text" />
							</a>
						</ul>
					</Col>
					{/* /Alex */}
				</Row>
			</section>
		</Container>
	);
}

export default TeamPage;