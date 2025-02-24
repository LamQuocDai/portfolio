// // @flow strict
// import { userData } from "@/data/user-data";
// import Image from "next/image";
// import GlowCard from "../helper/glow-card";
// import SectionTitle from "../helper/section-title";

// function GitStats() {
//   return (
//     <div
//       id="stats"
//       className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
//     >
//       <SectionTitle title="GitHub Statistics" />

//       <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-5">
//         <div className="md:col-span-2">
//           <GlowCard identifier="profile-details">
//             <div className="bg-primary-bg">
//               <Image
//                 src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${userData.githubUser}&theme=algolia`}
//                 width={1080}
//                 height={520}
//                 alt="github profile-details"
//                 className="rounded-lg "
//               />
//             </div>
//           </GlowCard>
//         </div>

//         <>
//           <GlowCard identifier="github-stats">
//             <Image
//               src={`https://github-readme-stats.vercel.app/api?username=${userData.githubUser}&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true`}
//               width={1080}
//               height={520}
//               alt="github stats"
//             />
//           </GlowCard>
//           <GlowCard identifier="github-stats-2">
//             <Image
//               src={`https://github-readme-stats.vercel.app/api?username=${userData.githubUser}&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&hide=stars,commits,prs,issues,contribs`}
//               width={1080}
//               height={520}
//               alt="github stats"
//               className="rounded-lg"
//             />
//           </GlowCard>
//         </>
//       </div>
//     </div>
//   );
// }

// export default GitStats;

// @flow strict
"use client";

import { userData } from "@/data/user-data";
import Image from "next/image";
import GlowCard from "../helper/glow-card";
import SectionTitle from "../helper/section-title";
import { useState } from "react";

function GitStats() {
  const [imageErrors, setImageErrors] = useState({
    profile: false,
    stats1: false,
    stats2: false,
  });

  const handleImageError = (imageKey) => {
    console.error(`Failed to load GitHub ${imageKey} image`);
    setImageErrors((prev) => ({
      ...prev,
      [imageKey]: true,
    }));
  };

  const renderGitHubImage = ({ src, alt, identifier, imageKey }) => (
    <GlowCard identifier={identifier}>
      {imageErrors[imageKey] ? (
        <div className="p-4 text-center bg-red-100/10 rounded-lg">
          <p>Failed to load GitHub statistics. Please try again later.</p>
          <p className="text-sm mt-2">URL: {src}</p>
        </div>
      ) : (
        <Image
          src={src}
          width={1080}
          height={520}
          alt={alt}
          className="rounded-lg"
          onError={() => handleImageError(imageKey)}
          loading="eager"
          priority={true}
        />
      )}
    </GlowCard>
  );

  return (
    <div
      id="stats"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <SectionTitle title="GitHub Statistics" />

      <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          {renderGitHubImage({
            src: `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${userData.githubUser}&theme=algolia`,
            alt: "github profile-details",
            identifier: "profile-details",
            imageKey: "profile",
          })}
        </div>

        {renderGitHubImage({
          src: `https://github-readme-stats.vercel.app/api?username=${userData.githubUser}&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true`,
          alt: "github stats",
          identifier: "github-stats",
          imageKey: "stats1",
        })}

        {renderGitHubImage({
          src: `https://github-readme-stats.vercel.app/api?username=${userData.githubUser}&show_icons=true&include_all_commits=true&theme=algolia&hide_border=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&hide=stars,commits,prs,issues,contribs`,
          alt: "github stats",
          identifier: "github-stats-2",
          imageKey: "stats2",
        })}
      </div>
    </div>
  );
}

export default GitStats;
