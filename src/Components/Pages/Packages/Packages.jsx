import React, { useEffect, useContext } from "react";
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Banner2 from "../../Banner/Banner2";
import Features from "../../Features/Features";
import PackageCards from "../../Packages/Packages";
import FAQ1 from "../../FAQ1/FAQ1";
import Footer from "../../Footer/Footer";
import data from "../../../Context/FAQS";
import "./Packages.css";
import ShowHero from "../../ShowHero/ShowHero";
import { ContentContext } from "../../../Context/Content/ContentState";
import ProjectFeedStatus from "../../util/ProjectFeedStatus/ProjectFeedStatus";

const Packages = () => {
  const { Projects, ProjectsLoading, ProjectsError, refreshProjects } =
    useContext(ContentContext);
  const featuredProjects = Projects.slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="packages">
      <Header />
      <Banner height="200px" title="Packages" isRanbow={true} />
      <PackageCards />
      <Features />
      <Banner2
        height="140px"
        title="Ready to get Started? Choose a package suitable for your business"
        btn={{ name: "Get Started!", onClick: () => window.scrollTo(0, 0) }}
      />
      <ProjectFeedStatus
        isLoading={ProjectsLoading}
        error={ProjectsError}
        isEmpty={
          !ProjectsLoading && !ProjectsError && featuredProjects.length === 0
        }
        onRetry={refreshProjects}
        loadingMessage="We are fetching the latest featured projects for this page."
        emptyMessage="There are no featured projects available right now."
      />
      {featuredProjects.map((project, index) => (
        <ShowHero
          key={project.websiteId || project.id || index}
          project={project}
          reverse={index % 2 === 1}
        />
      ))}
      <Banner2
        height="140px"
        title="Decided? Choose a package suitable for your requirements"
        btn={{ name: "Get Started!", onClick: () => window.scrollTo(0, 0) }}
      />
      <FAQ1 data={data.slice(0, 8)} />
      <Footer />
    </div>
  );
};

export default Packages;
