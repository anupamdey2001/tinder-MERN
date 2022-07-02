import Nav from "../Components/Nav"
import { useState } from 'react';
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Onboarding = () => {
    const [cookie, setCookie, removeCookie] = useCookies('user');
    const [formData, setFormData] = useState({
        user_id: cookie.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: false,
        gender_identity: "man",
        gender_interest: "woman",
        url: "",
        about: "",
        matches: []
    });


    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/user', { formData })
            const success = response.status === 200;
            if (success) navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }


    const handleChange = (e) => {
        console.log("e", e);
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }


    console.log(formData);

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => { }}
                showModal={false}
            />

            <div className="onBoarding">
                <h2>CREATE ACCOUNT</h2>

                <form action="" onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder='First Name'
                            value={formData.first_name}
                            required={true}
                            onChange={handleChange}
                        />


                        <label>Birthday</label>
                        <div className="multiple_input_container">
                            <input
                                type="number"
                                id="dob_day"
                                name="dob_day"
                                placeholder='DD'
                                value={formData.dob_day}
                                required={true}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                id="dob_month"
                                name="dob_month"
                                placeholder='MM'
                                value={formData.dob_month}
                                required={true}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                id="dob_year"
                                name="dob_year"
                                placeholder='YYYY'
                                value={formData.dob_year}
                                required={true}
                                onChange={handleChange}
                            />
                        </div>


                        <label>Gender</label>
                        <div className="multiple_input_container">
                            <input
                                type="radio"
                                id="man-gender-identity"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'man'}
                            />
                            <label htmlFor="man-gender-identity">Man</label>


                            <input
                                type="radio"
                                id="woman-gender-identity"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'woman'}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>


                            <input
                                type="radio"
                                id="more-gender-identity"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'more'}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="show-gender">Show Gender on My Profile</label>
                        <input
                            type="checkbox"
                            id="show-gender"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />




                        <label>Show Me</label>
                        <div className="multiple_input_container">
                            <input
                                type="radio"
                                id="man-gender-interest"
                                name="gender_interest"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'man'}
                            />
                            <label htmlFor="man-gender-interest">Man</label>


                            <input
                                type="radio"
                                id="woman-gender-interest"
                                name="gender_interest"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'woman'}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>


                            <input
                                type="radio"
                                id="everyone-gender-interest"
                                name="gender_interest"
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'everyone'}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About Me</label>
                        <input
                            type="text"
                            id='about'
                            name='about'
                            placeholder='I like long walks...'
                            required={true}
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <input type="submit" value="Submit" />
                    </section>





                    <section>
                        <label htmlFor="url">Profile Photo</label>
                        <input type="url" name="url" id="url" onChange={handleChange} required={true} />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="Profile Pic Preview " />}
                        </div>
                    </section>
                </form>

            </div>
        </>
    )
}

export default Onboarding