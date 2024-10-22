import '../css/main.css';
import NavbarSection from '../components/NavSection';
import Home from '../components/home';
// import Teams from '../components/myTeams';
// import Tasks from '../components/myTasks';
// import Project from '../components/myProjects';

function MainPage(){
    return(
        <div className="main-page">
            <section className='NavSection'>
            <NavbarSection />
            </section>
            <section className='MainSection'>
             < Home />
             {/* < Teams /> */}
             {/* < Tasks /> */}
             {/* <Project /> */}
            </section>
        </div>
    )
}

export default MainPage;