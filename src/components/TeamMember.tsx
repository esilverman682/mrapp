/* eslint-disable @next/next/no-img-element */
import { TeamMember as TeamMemberType } from 'client';

interface TeamMemberProps {
  teamMember: TeamMemberType;
}

export default function TeamMember({ teamMember }: TeamMemberProps) {
  return (
     <div>
       <img
        src={teamMember?.profilePic.mediaItemUrl}
        alt={teamMember?.profilePic?.altText}
      />
      <h2>{teamMember?.fullName}</h2>
      <div
        className="bio"
        dangerouslySetInnerHTML={{ __html: teamMember?.bio }}
      />
    </div>
  );
}