import { Button, Stack, Box } from '@chakra-ui/react';
import { useContext, useCallback } from 'react';
import { VeriContext } from '../../../contexts/veri';
import { IoMdSave, IoMdCloudUpload, IoMdSend, IoMdEye } from 'react-icons/io';
import { DistributionMethodForm } from '../../molecules/DistributionMethodForm';
import { EventDetailForm } from '../../molecules/EventDetailForm';
import { VeriDetailForm } from '../../molecules/VeriDetailForm';
import { MdDelete } from 'react-icons/md';

export const AddVeri = () => {
  const context = useContext(VeriContext);

  const handleDifferentSubmit = useCallback(
    (status: string) => {
      context.formik.setFieldValue('status', status);
      context.formik.handleSubmit();
    },
    [context.formik],
  );

  return (
    <form>
      <Stack gap={8}>
        <EventDetailForm title="EVENT DETAILS" />
        <VeriDetailForm title="VERI DETAILS" />
        <DistributionMethodForm title="Distribution Method" />
        {/* <>{JSON.stringify(context.formik.values)}</> */}

        <Box>
          <Stack spacing={4} width={80} mx="auto">
            {context.formType === 'Add' && (
              <>
                <Button
                  colorScheme="primary"
                  isDisabled={
                    context.formik.isSubmitting ||
                    !(context.formik.isValid && context.formik.dirty)
                  }
                  leftIcon={<IoMdCloudUpload />}
                  onClick={() => handleDifferentSubmit('created')}
                >
                  Create VERI
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<IoMdSave />}
                  onClick={() => handleDifferentSubmit('draft')}
                >
                  Save Draft
                </Button>
              </>
            )}
            {context.formType === 'View' && (
              <>
                {context.formik.values.status === 'draft' ? (
                  <Button
                    colorScheme="primary"
                    isDisabled={
                      context.formType !== 'View' &&
                      (context.formik.isSubmitting ||
                        !(context.formik.isValid && context.formik.dirty))
                    }
                    leftIcon={<IoMdCloudUpload />}
                    onClick={() => handleDifferentSubmit('created')}
                  >
                    Create VERI
                  </Button>
                ) : (
                  <Button
                    colorScheme="primary"
                    leftIcon={<IoMdSend />}
                    onClick={context.onSend}
                  >
                    Send VERIs
                  </Button>
                )}
                {(context.formik.values.status === 'draft' ||
                  context.formik.values.status === 'created') && (
                  <Button
                    variant="secondary"
                    leftIcon={<MdDelete />}
                    onClick={context.onDelete}
                  >
                    Delete VERI
                  </Button>
                )}
                {context.formik.values.status !== 'draft' && (
                  <Button variant="secondary" leftIcon={<IoMdEye />}>
                    View on Block Explorer
                  </Button>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};
