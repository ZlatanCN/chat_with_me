import { Modal } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Agreement = (props) => {

  return (
    <Modal
      title="Registration Agreement Terms"
      open={props.isModalOpen}
      onOk={props.handleModalButton}
      onCancel={props.handleModalButton}
      width={800}
    >
      <p>Welcome to ChatWithMe! By creating an account and using our services,
        you agree to the following terms and conditions:</p>
      <p><strong>1. Account Creation:</strong></p>
      <p>You must provide accurate and complete information during the
        registration process. You are responsible for maintaining the
        confidentiality of your account credentials. You must be at least 13
        years old to use this service. If you are under 18, you may only use
        this service under the supervision of a parent or legal guardian.</p>

      <p><strong>2. User Conduct:</strong></p>
      <p>You agree to use the chat services for lawful purposes only. Any
        behavior that is abusive, harassing, defamatory, or otherwise
        inappropriate will not be tolerated. You agree not to share, post, or
        distribute any content that violates the rights of others, including
        but not limited to intellectual property rights, privacy rights, or
        any other legal rights. You are solely responsible for any content you
        share or post within the chat application.</p>

      <p><strong>3. Privacy:</strong></p>
      <p>We respect your privacy. By using this application, you agree to our
        collection and use of your information as outlined in our Privacy
        Policy. You understand that any content shared in public chatrooms may
        be visible to other users. Exercise caution when sharing personal or
        sensitive information.</p>

      <p><strong>4. Security:</strong></p>
      <p>We take security seriously and strive to protect your information.
        However, we cannot guarantee that unauthorized third parties will
        never be able to breach our security measures. You acknowledge that
        you provide your personal information at your own risk.</p>

      <p><strong>5. Modification of Terms:</strong></p>
      <p>We reserve the right to modify these terms at any time. Any changes
        will be effective immediately upon posting. Your continued use of the
        service constitutes acceptance of the revised terms.</p>

      <p><strong>6. Termination:</strong></p>
      <p>We reserve the right to terminate or suspend your account at any time
        for any reason, including, but not limited to, violations of these
        terms.</p>

      <p><strong>7. Disclaimer:</strong></p>
      <p>The service is provided "as is" without warranties of any kind,
        either express or implied. We do not guarantee that the service will
        be uninterrupted, error-free, or secure.</p>

      <p><strong>8. Governing Law:</strong></p>
      <p>These terms and conditions are governed by and construed in
        accordance with the laws of [Your Jurisdiction]. Any disputes arising
        from these terms shall be resolved in the courts of [Your
        Jurisdiction].</p>

      <p>By clicking "Register" or using our services, you acknowledge that
        you have read, understood, and agree to be bound by these terms and
        conditions.</p>
    </Modal>
  )
}

Agreement.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModalButton: PropTypes.func,
};

export default Agreement;