import { faqHeading } from "@/constant";
import { useState } from "react";
import Accordion from "../Accordian";

export const FAQs = () => {
  const fAQsData = [
    {
      id: 1,
      question: "What is an AMI Name?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            AMI Name is Cosmos’ first Self-Sovereign Identity which is
            permanently allocated to a user and does not expire ever, unlike
            other Naming Systems (like DNS, ENS, etc.) which are only
            temporarily allocated. AMI names are globally resolvable as
            Decentralized Identifiers (DIDs), a pioneer Web3 technology, which
            means your identity will be accessible, and verifiable, in a purely
            decentralized way, from anywhere in the globe. AMI names also
            implement account abstraction, which means you will never be ‘locked
            out’ of your identity control, due to forgetting password or losing
            one of the keys, making them the only singular identity you will
            ever require to manage all your assets. Hence the core tenets of AMI
            Names are:
          </p>
          <ul className="mt-5 list-disc">
            <li className="mr-2 mt-2">
              <p className="paragraph_regular !font-bold">
                Self-Sovereign Identity:{" "}
                <span className="font-normal">
                  you create your own identity without anyone’s permission or
                  authorization.
                </span>
              </p>
            </li>
            <li className="mr-2 mt-2">
              <p className="paragraph_regular !font-bold">
                Permanently Allocated:
                <span className="font-normal">
                  you have ‘true perpetual control’ of your identity which never
                  expires or de-allocates, unlike Naming Systems (e.g., DNS,
                  ENS) which are temporarily allocated, and de-allocated.
                </span>
              </p>
            </li>
            <li className="mr-2 mt-2">
              <p className="paragraph_regular !font-bold">
                DID Based:
                <span className="font-normal">
                  globally accessible identity from any web3 / web2 system,
                  resolved as a DID document, and verifiable in a decentralized
                  way, instilling “zero downtime”.
                </span>
              </p>
            </li>
            <li className="mr-2 mt-2">
              <p className="paragraph_regular !font-bold">
                Account Abstraction:
                <span className="font-normal">
                  your identity is controlled by you using multiple ‘provision
                  addresses’ as keys, making sure you will never be ‘locked out’
                  and can always recover in case you lose a key.
                </span>
              </p>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      question: "What can I do with AMI Name?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            AMI Name is the only singular identity you will ever require
            managing the ownership of any and every kind of assets. You could in
            the future, use your AMI Name to login to MantlePlace Web3 (coming
            soon), which is AssetMantle’s upcoming fully non-custodial secondary
            marketplace for NFT based Assets. You could also in the future, use
            this identity in any Decentralized Identifier (DID) based Self
            Sovereign Identity (SSI) protocol, and manage ownership of assets or
            perform any kind of transfer of value there.
          </p>
        </>
      ),
    },
    {
      id: 3,
      question: "What is SSI?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            SSI (Self Sovereign Identity) is a model for managing digital
            identities in which individuals or businesses have sole control over
            their accounts and personal data. Individuals with self-sovereign
            identity can store their data on their devices and provide it for
            verification and transactions without the need to rely upon a
            central repository of data. With self-sovereign identity, users have
            complete control over how they create their identity, and how their
            personal information is kept and used.
          </p>
        </>
      ),
    },
    {
      id: 4,
      question: "What is DID?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            Decentralized identifiers (DIDs) are a new type of identifier that
            enables verifiable, decentralized digital identity. A DID refers to
            any subject (e.g., a person, organization, thing, data model,
            abstract entity, etc.) as determined by the controller of the DID.
            In contrast to typical, federated identifiers, DIDs have been
            designed so that they may be decoupled from centralized registries,
            identity providers, and certificate authorities. DIDs are globally
            unique, and resolvable as a DID Document, which means one can access
            and verify their identity from anywhere, with no ‘down time’.
          </p>{" "}
        </>
      ),
    },
    {
      id: 5,
      question: "What is Account Abstraction?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            Account Abstraction refers to de-coupling the association of your
            account from a single ‘blockchain address’, and making it an
            independently existing entity, where one can allocate multiple
            “blockchain address’ based keys to operate the account. This
            dissociates from the idea of ‘account’ that exists in blockchains
            like Ethereum, where “blockchain address” IS the account itself, and
            makes it into a separate entity, where “blockchain addresses” can be
            added / removed as ‘provision keys’. Account abstraction is now
            getting popular in Ethereum as well, by introduction of ERC-4337, a
            standard for Account Abstraction.
          </p>
        </>
      ),
    },
    {
      id: 6,
      question: "What is a Provision Address / Provision Address Key?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            Provision address is your blockchain address that you use as the
            ‘key’ to operating your Account. This address will be used to create
            transactions that can transfer assets to and from your account, or
            perform other operations. More than one provision addresses can be
            allocated to an account, so that if one loses the private key of a
            provision addresses, he/she can use the other provision address to
            replace the ‘locked’ address with another provision address. This
            de-couples the account from being allocated to a single blockchain
            address, controlled by a single private key.
          </p>
        </>
      ),
    },
    {
      id: 7,
      question:
        "How to recover my AMI Name if I lose the Provision Address key?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            One needs to first allocate more than one provision addresses to
            their AMI Name. Then, if they lose the private key / password /
            passphrase of one of the provision address, then the other provision
            address can be used to replace it with a new provision address as
            the account key. This concept is also called Multiple Rotatable Keys
            (MRK).
          </p>
        </>
      ),
    },
    {
      id: 8,
      question: "What are Multiple Rotatable Keys (MRK)?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            Multiple Rotatable Keys (MRK) is a concept of Account abstraction
            where multiple provision addresses can be allocated to an account as
            ‘keys’ which control the account. These keys can then be ‘rotated’
            in and out of operation. One can rotate out their keys in regular
            intervals so as to provide extra security in case a key gets
            compromised. This is similar to changing your passwords regularly as
            a best practice for security, in web2.
          </p>
        </>
      ),
    },
    {
      id: 9,
      question: "For how long I own the AMI Name?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            Your AMI Name, once claimed / allocated to your provision address,
            will never expire and never go out of commission. You have
            ‘perpetual control’ over your AMI Name, unless you choose to
            transfer the control of your AMI name to a provision address
            controlled by someone else.
          </p>
        </>
      ),
    },
    {
      id: 10,
      question: "How do I Transfer my AMI Name?",
      answer: (
        <>
          <p className="mt-6 paragraph_regular">
            AMI Name is conceptually supposed to be a singular allocation for
            each user / organization / institution etc. But still, in case you
            want to transfer your AMI Name, you will have to use one of your
            connected provision addresses to your AMI Name, to add an additional
            provision address which belongs to the recipient. You will also have
            to de-provision every other connected provision address, leaving the
            newly added provision address as the sole provision address. The
            recipient will then have exclusive control over the AMI Name, and
            will have to, as best practice, add more provision addresses as keys
            for account recovery.
          </p>
        </>
      ),
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const handleOpen = (val: number) => {
    setOpen(!open);
    if (activeAccordion === val) {
      setActiveAccordion(0);
    } else {
      setActiveAccordion(val);
    }
  };
  return (
    <section className={`container mx-auto  py-[100px] `}>
      <div className={`text-center`}>
        <h2 className={`heading1_extrabold mb-[72px] `}>{faqHeading}</h2>
      </div>
      <div
        className={`mx-[10%] py-2 mb-4
                        cursor-pointer`}
      >
        {fAQsData?.map((item, index) => {
          return (
            <div
              role={"presentation"}
              key={index}
              className={` ${
                item.id !== activeAccordion ? "" : ""
              }  relative flex items-center cursor-pointer border-b border-b-[#E3E3E3] last:border-b-0`}
            >
              <Accordion
                className=""
                accordionHeader={
                  <>
                    <p className="heading3_semibold">{item.question}</p>
                  </>
                }
                accordionBody={item.answer}
                id={index}
                key={index}
                handleOpen={() => handleOpen(item.id)}
                open={item.id === activeAccordion}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
