import trumpImage from '../images/trumpers.jpg'

const HomePage = () => {
    return(
        <section className="container-sm-md-lg text-center">
            <h3 className="display-1 ">🏈 Yee haw! 🦅</h3>

            <h3 className="display-8">Thank you for helping make America great again.</h3>

            <img src={trumpImage} className="img-fluid" alt='Photo of Great Leader' />

            <h3 className="display-8">We collected the least qualified personnell we could possibly find, and we're using this website to organise them!</h3>
        </section>
    )
}

export default HomePage;