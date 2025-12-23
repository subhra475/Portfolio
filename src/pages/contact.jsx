import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import "./styles/contact.css";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	// 🔹 Form state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	// 🔹 Submit handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await addDoc(collection(db, "contacts"), {
				name,
				email,
				message,
				createdAt: serverTimestamp(),
			});

			alert("Message sent successfully!");
			setName("");
			setEmail("");
			setMessage("");
		} catch (error) {
			console.error(error);
			alert("Something went wrong!");
		}

		setLoading(false);
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-container">
						<div className="title contact-title">
							Let's Get in Touch
						</div>

						{/* 🔹 CONTACT FORM */}
						<form className="contact-form" onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Your Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>

							<input
								type="email"
								placeholder="Your Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<textarea
								placeholder="Your Message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
							/>

							<button type="submit" disabled={loading}>
								{loading ? "Sending..." : "Send Message"}
							</button>
						</form>
					</div>

					<div className="socials-container">
						<div className="contact-socials">
							<Socials />
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
