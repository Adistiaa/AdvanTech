import Hero from '../components/Hero';
import Quotes from '../components/Quotes';
import WhyChooseUs from '../components/WhyChooseUs';
import TeamStory from '../components/TeamStory';
import Location from '../components/Location';
import TeamMembers from '../components/TeamMembers';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import NavigationDecorator from '../components/NavigationDecorator';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Quotes />
      <WhyChooseUs />
      <TeamStory />
      <Location />
      <TeamMembers />
      <FAQ />
      <Testimonials />
      <NavigationDecorator />
    </div>
  );
};

export default Home;
