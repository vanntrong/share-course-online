import BaseDocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Container, Modal } from "@mantine/core";
import { FC } from "react";

interface DocViewerProps {
  open: boolean;
  onClose: () => void;
  docs: { uri: string }[];
}

const DocViewer: FC<DocViewerProps> = ({ open, onClose, docs, ...props }) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      centered
      size={"100vw"}
      transitionProps={{
        transition: "scale",
      }}
    >
      <Container>
        <BaseDocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          style={{
            height: "80vh",
          }}
          {...props}
        />
      </Container>
    </Modal>
  );
};

export default DocViewer;
