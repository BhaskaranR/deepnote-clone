import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { TripleColumn } from "responsive-react-email";

type Props = {
  baseUrl?: string;
};

export function Footer({ baseUrl }: Props) {
  return (
    <Section className="w-full">
      <Hr />

      <br />

      <Text className="text-[21px] font-regular">
        Let's make your business grow.
      </Text>

      <br />

      <TripleColumn
        pX={0}
        pY={0}
        styles={{ textAlign: "left" }}
        columnOneContent={
          <Section className="text-left p-0 m-0">
            <Row>
              <Text className="font-medium">Features</Text>
            </Row>

            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/bOp4NOx"
              >
                Overview
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/VFcNsmQ"
              >
                Inbox
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/uA06kWO"
              >
                Vault
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/x7Fow9L"
              >
                Tracker
              </Link>
            </Row>

            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/fkYXc95"
              >
                Invoice
              </Link>
            </Row>

            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/dEnP9h5"
              >
                Pricing
              </Link>
            </Row>

            {/* <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/E24P3oY"
              >
                Engine
              </Link>
            </Row> */}

            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://deepnote-clone.com/download"
              >
                Download
              </Link>
            </Row>
          </Section>
        }
        columnOneStyles={{ paddingRight: 0, paddingLeft: 0, width: 185 }}
        columnTwoContent={
          <Section className="text-left p-0 m-0">
            <Row>
              <Text className="font-medium">Resources</Text>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/fhEy5CL"
              >
                Homepage
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/ZrhEMbR"
              >
                Support
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/rofdWKi"
              >
                Terms of service
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/TJIL5mQ"
              >
                Privacy policy
              </Link>
            </Row>

            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/IQ1kcN0"
              >
                Branding
              </Link>
            </Row>

            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/x5ohOs7"
              >
                Feature Request
              </Link>
            </Row>
          </Section>
        }
        columnTwoStyles={{ paddingRight: 0, paddingLeft: 0, width: 185 }}
        columnThreeContent={
          <Section className="text-left p-0 m-0">
            <Row>
              <Text className="font-medium">Company</Text>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/186swoH"
              >
                Story
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/QWyX8Um"
              >
                Updates
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/Dd7M8cl"
              >
                Open startup
              </Link>
            </Row>
            <Row className="mb-1.5">
              <Link
                className="text-[#707070] text-[14px]"
                href="https://go.deepnote-clone.com/M2Hv420"
              >
                OSS Friends
              </Link>
            </Row>
          </Section>
        }
        columnThreeStyles={{ paddingRight: 0, paddingLeft: 0, width: 185 }}
      />

      <br />
      <br />

      <Row>
        <Column className="align-middle w-[40px]">
          <Link href="https://go.deepnote-clone.com/lS72Toq">
            <Img
              src={`${baseUrl}/x.png`}
              width="22"
              height="22"
              alt="deepnote-clone on X"
            />
          </Link>
        </Column>
        <Column className="align-middle w-[40px]">
          <Link href="https://go.deepnote-clone.com/7rhA3rz">
            <Img
              src={`${baseUrl}/producthunt.png`}
              width="22"
              height="22"
              alt="deepnote-clone on Producthunt"
            />
          </Link>
        </Column>

        <Column className="align-middle">
          <Link href="https://go.deepnote-clone.com/Ct3xybK">
            <Img
              src={`${baseUrl}/linkedin.png`}
              width="22"
              height="22"
              alt="deepnote-clone on LinkedIn"
            />
          </Link>
        </Column>
      </Row>

      <br />
      <br />

      <Row>
        <Text className="text-[#B8B8B8] text-xs">
          deepnote-clone LLC - Torsgatan 59 113 37, Stockholm, Sweden.
        </Text>
      </Row>

      <Row>
        <Link
          className="text-[#707070] text-[14px]"
          href="https://app.deepnote-clone.com/settings/notifications"
          title="Unsubscribe"
        >
          Notification preferences
        </Link>
      </Row>

      <br />
      <br />

      <Row>
        <Link href="https://go.deepnote-clone.com/FZwOHud">
          <Img
            src={`${baseUrl}/logo-footer.png`}
            width="100"
            alt="deepnote-clone"
            className="block"
          />
        </Link>
      </Row>
    </Section>
  );
}
