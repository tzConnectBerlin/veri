import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Heading,
  HStack,
  Button,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdSave } from 'react-icons/md';
import { VeriContext } from '../../../contexts/veri';
import { VeriFormStatus } from '../../../types';
import { getDisplayTimeRange } from '../../../utils/general';

export interface EventDetailFormProps {
  title?: string;
}
export const EventDetailForm: React.FC<EventDetailFormProps> = ({ title }) => {
  const context = useContext(VeriContext);
  const [editMode, setEditMode] = useState<VeriFormStatus>();
  const BoxBg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    setEditMode(context.formType);
  }, [context.formType]);

  const handleEdit = () => {
    context.formik.handleSubmit();
    setEditMode('View');
  };

  return (
    <Box rounded={'lg'} bg={BoxBg} boxShadow={'lg'} p={8}>
      <HStack justifyContent="space-between" mb={10}>
        <Heading fontSize={'xl'}>{title}</Heading>
        {editMode === 'View' && (
          <Button
            size="xs"
            border="none"
            variant="secondary"
            leftIcon={<MdEdit />}
            onClick={() => setEditMode('Edit')}
          >
            Edit
          </Button>
        )}
        {editMode === 'Edit' && (
          <Button
            size="xs"
            border="none"
            variant="secondary"
            leftIcon={<MdSave />}
            onClick={handleEdit}
          >
            Save
          </Button>
        )}
      </HStack>
      <Stack spacing={10}>
        <FormControl
          isReadOnly={editMode === 'View' ? true : false}
          isRequired
          isInvalid={
            context.formik.touched.eventName &&
            !!context.formik.errors.eventName
          }
        >
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            name="eventName"
            value={context.formik.values.eventName}
            onChange={context.formik.handleChange}
            onBlur={context.formik.handleBlur}
          />
          <FormErrorMessage>{context.formik.errors.eventName}</FormErrorMessage>
        </FormControl>
        <FormControl
          isReadOnly={editMode === 'View' ? true : false}
          isRequired
          isInvalid={
            context.formik.touched.organizer &&
            !!context.formik.errors.organizer
          }
        >
          <FormLabel>Organizer</FormLabel>
          <Input
            type="text"
            name="organizer"
            value={context.formik.values.organizer}
            onChange={context.formik.handleChange}
            onBlur={context.formik.handleBlur}
          />
          <FormErrorMessage>{context.formik.errors.organizer}</FormErrorMessage>
        </FormControl>
        <FormControl
          isReadOnly={editMode === 'View' ? true : false}
          isRequired
          isInvalid={
            context.formik.touched.organizerEmail &&
            !!context.formik.errors.organizerEmail
          }
        >
          <FormLabel>Organizer Email</FormLabel>
          <Input
            type="organizerEmail"
            name="organizerEmail"
            value={context.formik.values.organizerEmail}
            onChange={context.formik.handleChange}
            onBlur={context.formik.handleBlur}
          />
          <FormErrorMessage>
            {context.formik.errors.organizerEmail}
          </FormErrorMessage>
        </FormControl>
        {editMode !== 'View' ? (
          <>
            <FormControl>
              <FormLabel>Event Duration</FormLabel>
              <RadioGroup
                name="eventDuration"
                value={context.formik.values.eventDuration}
              >
                <Stack>
                  <Radio value="Single" onChange={context.formik.handleChange}>
                    Single Day
                  </Radio>
                  <Radio
                    value="Multiday"
                    onChange={context.formik.handleChange}
                  >
                    Multi Days
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {context.formik.errors.eventDuration}
              </FormErrorMessage>
            </FormControl>
            <Stack gap={8} direction="row">
              <FormControl
                isRequired
                isInvalid={
                  context.formik.touched.eventStartDate &&
                  !!context.formik.errors.eventStartDate
                }
              >
                <FormLabel>
                  {context.formik.values.eventDuration === 'Multiday' &&
                    'Start '}
                  Date
                </FormLabel>
                <Input
                  type="datetime-local"
                  name="eventStartDate"
                  value={context.formik.values.eventStartDate}
                  onChange={context.formik.handleChange}
                  onBlur={context.formik.handleBlur}
                />
                <FormErrorMessage>
                  {context.formik.errors.eventStartDate}
                </FormErrorMessage>
              </FormControl>
              {context.formik.values.eventDuration === 'Multiday' && (
                <FormControl
                  isRequired
                  isInvalid={
                    context.formik.touched.eventEndDate &&
                    !!context.formik.errors.eventEndDate
                  }
                >
                  <FormLabel>End Date</FormLabel>

                  <Input
                    type="datetime-local"
                    name="eventEndDate"
                    min={context.formik.values.eventStartDate}
                    value={context.formik.values.eventEndDate}
                    onChange={context.formik.handleChange}
                    onBlur={context.formik.handleBlur}
                  />
                  <FormErrorMessage>
                    {context.formik.errors.eventEndDate}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Stack>
          </>
        ) : (
          <>
            <FormControl>
              <FormLabel>Event Duration</FormLabel>
              <Text>
                {context.formik.values.eventDuration === 'Single'
                  ? 'Single-Day'
                  : 'Multi-Day'}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Date(s)</FormLabel>
              <Text>
                {context.formik.values.eventDuration === 'Single'
                  ? moment(
                      new Date(context.formik.values.eventStartDate),
                    ).format('lll')
                  : getDisplayTimeRange(
                      new Date(context.formik.values.eventStartDate),
                      new Date(context.formik.values.eventEndDate),
                    )}
              </Text>
            </FormControl>
          </>
        )}
      </Stack>
    </Box>
  );
};
